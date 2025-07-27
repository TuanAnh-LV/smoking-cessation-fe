import React, { useState, useEffect, useRef } from "react";
import {
  VideoCameraOutlined,
  CloseOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CommunityPage from "../pages/CommunityPage/CommunityPage";
import { ChatService } from "../services/chat.service";
import { UserService } from "../services/user.service";
import { io } from "socket.io-client";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [coachName, setCoachName] = useState("Coach");
  const [coachId, setCoachId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isProUser, setIsProUser] = useState(true);
  const [coachSessionId, setCoachSessionId] = useState(null);
  const [socket, setSocket] = useState(null);
  const coachSocketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.id;
    setCurrentUserId(userId);

    const setupCoach = async () => {
      try {
        const res = await ChatService.getOrCreateSession();
        const session = res?.data?.data;
        if (!session?._id) return;
        setCoachId(session.coach_id?._id);
        setCoachName(session.coach_id?.full_name + " (Coach)");
        setCoachSessionId(session._id);

        const socketRef = io(`${import.meta.env.VITE_SOCKET_URL}/coach`, {
          auth: { token },
        });
        coachSocketRef.current = socketRef;

        socketRef.on("connect", () => {
          socketRef.emit("joinSession", session._id);
        });

        setSocket(socketRef);
      } catch (error) {
        console.error("Lỗi tạo coach session:", error);
      }
    };

    const checkProStatus = async () => {
      try {
        const res = await UserService.getUserMembership(userId);
        const pkg = res?.data?.package_id?.name;
        setIsProUser(pkg === "pro");
      } catch (err) {
        console.error("Lỗi lấy thông tin gói:", err);
      }
    };

    setupCoach();
    checkProStatus();

    return () => {
      if (coachSocketRef.current) {
        coachSocketRef.current.disconnect();
      }
    };
  }, []);

  const handleVideoCall = () => {
    if (!coachId || !currentUserId || !coachSessionId || !socket) return;

    const link = `${window.location.origin}/call/${currentUserId}-${coachId}`;
    socket.emit("sendMessage", {
      sessionId: coachSessionId,
      content: link,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "#A86523",
            color: "#fff",
            padding: "12px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <MessageOutlined style={{ fontSize: "20px" }} />
        </button>
      ) : (
        <div
          style={{
            width: "400px",
            height: "500px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#A86523",  
              color: "white",
              padding: "10px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              onClick={() => coachId && navigate(`/profile-coach/${coachId}`)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              title="Xem hồ sơ coach"
            >
              <strong>{coachName}</strong>
              <VideoCameraOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleVideoCall();
                }}
                style={{ fontSize: "18px", cursor: "pointer" }}
                title="Meet"
              />
            </div>
            <CloseOutlined
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <CommunityPage
              isWidget={true}
              externalSocket={socket}
              externalSessionId={coachSessionId}
              externalUserId={currentUserId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
