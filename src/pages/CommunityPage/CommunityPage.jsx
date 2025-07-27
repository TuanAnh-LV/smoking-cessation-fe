// src/pages/CommunityPage/CommunityPage.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Input,
  Button,
  Avatar,
  Badge,
} from "antd";
import {
  SendOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { ChatService } from "../../services/chat.service";
import { UserService } from "../../services/user.service";

const { Text } = Typography;
const { TextArea } = Input;

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 60%, 70%)`;
}

const CommunityPage = ({
  isWidget = false,
  externalSocket = null,
  externalSessionId = null,
  externalUserId = null,
}) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [coachSessionId, setCoachSessionId] = useState(null);
  const [coachName, setCoachName] = useState("Coach");
  const [coachId, setCoachId] = useState(null);
  const coachSocketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.id;
    setCurrentUserId(externalUserId || userId);

    const setupCoachSocket = async () => {
      try {
        const res = await ChatService.getOrCreateSession();
        const session = res?.data?.data;
        if (!session?._id) return;
        setCoachSessionId(session._id);
        setCoachId(session.coach_id?._id);
        setCoachName(session.coach_id?.full_name + " (Coach)");

        const msgRes = await ChatService.getMessages(session._id);
        setMessages(msgRes?.data?.data || []);

        const socketRef = io(`${import.meta.env.VITE_SOCKET_URL}/coach`, {
          auth: { token },
        });
        coachSocketRef.current = socketRef;

        socketRef.on("connect", () => {
          socketRef.emit("joinSession", session._id);
        });

        socketRef.on("newMessage", (msg) => {
          setMessages((prev) => {
            if (prev.some((m) => (m._id || m.id) === (msg._id || msg.id))) return prev;
            return [...prev, msg];
          });
        });

        setSocket(socketRef);
      } catch (err) {
        console.error("Loi tao coach session:", err);
      }
    };

    const checkPermission = async () => {
      try {
        const res = await UserService.getUserMembership(userId);
        if (res?.data?.package_id?.can_message_coach) {
          if (externalSocket && externalSessionId) {
            setSocket(externalSocket);
            setCoachSessionId(externalSessionId);
            externalSocket.on("newMessage", (msg) => {
              setMessages((prev) => {
                if (prev.some((m) => (m._id || m.id) === (msg._id || msg.id))) return prev;
                return [...prev, msg];
              });
            });
            const msgRes = await ChatService.getMessages(externalSessionId);
            setMessages(msgRes?.data?.data || []);
          } else {
            await setupCoachSocket();
          }
        }
      } catch (err) {
        console.error("Khong the kiem tra quyen:", err);
      }
    };

    checkPermission();

    return () => {
      if (!externalSocket && coachSocketRef.current) {
        coachSocketRef.current.off("newMessage");
        coachSocketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !coachSessionId || !socket) return;
    socket.emit("sendMessage", {
      sessionId: coachSessionId,
      content: input,
    });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full" style={{ minHeight: "100%", maxHeight: "100%" }}>
      {!isWidget && (
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Badge>
              <Avatar style={{ backgroundColor: stringToColor(coachName), verticalAlign: "middle" }}>
                {coachName.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
            <span className="font-semibold text-sm">{coachName}</span>
          </div>
          <Button
            icon={<VideoCameraOutlined />}
            size="small"
            onClick={() => {
              if (!coachSessionId || !currentUserId || !coachId) return;
              const link = `${window.location.origin}/call/${currentUserId}-${coachId}`;
              socket.emit("sendMessage", {
                sessionId: coachSessionId,
                content: link,
              });
            }}
          >
            Meet
          </Button>
        </div>
      )}
      <div className="flex-grow overflow-y-auto px-2 pt-4 space-y-4" style={{ minHeight: 0 }}>
        {messages.map((msg, index) => {
          const senderId = msg.user_id?._id || msg.user_id || msg.author_id?._id;
          const isOwn = String(senderId) === String(currentUserId);
          const displayName = isOwn ? "Bạn" : coachName;
          return (
            <div
              key={msg.id || msg._id || index}
              className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}
            >
              <span className="text-xs text-gray-500 font-medium mb-1">{displayName}</span>
              <div className="max-w-[70%] break-words">
                <div
                  className={`px-4 py-2 rounded-xl whitespace-pre-wrap break-words font-bold ${
                    isOwn ? "bg-[#A86523] text-white" : "bg-gray-100 text-white"
                  }`}
                >
                  <Text>
                    {msg.content.startsWith("http") ? (
                      <>
                        <p className="text-white font-bold">Hãy tham gia cuộc gọi video tại: </p>
                        <a
                          href={msg.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "white",
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          {msg.content}
                        </a>
                      </>
                    ) : (
                      msg.content
                    )}
                  </Text>
                </div>
                <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <ClockCircleOutlined className="text-[10px]" />
                  <span>{dayjs(msg.sent_at || msg.timestamp).format("HH:mm")}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center gap-2 mt-2 px-2 pb-2" style={{ flexShrink: 0 }}>
        <TextArea
          rows={1}
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex-1 rounded-lg"
        />
        <Button
          style={{ backgroundColor: "#A86523", borderColor: "#A86523" }}
          type="primary"
          icon={<SendOutlined />}
          onClick={sendMessage}
          className="rounded-lg"
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default CommunityPage;
