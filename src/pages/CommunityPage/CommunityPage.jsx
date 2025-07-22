import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Input,
  Button,
  List,
  Badge,
  Divider,
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

const { Title, Text } = Typography;
const { TextArea } = Input;

const CommunityPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [coachSessionId, setCoachSessionId] = useState(null);
  const [coachName, setCoachName] = useState("Coach");
  const [coachId, setCoachId] = useState(null);
  const [membershipPackageCode, setMembershipPackageCode] = useState(null);
  const coachSocketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.id;
    setCurrentUserId(userId);

    const setupCoachSocket = async () => {
      try {
        const res = await ChatService.getOrCreateSession();
        const session = res?.data?.data;
        if (!session?._id) return;

        setCoachSessionId(session._id);
        setCoachId(session.coach_id?._id);
        setCoachName(session.coach_id?.full_name + " " + "(Coach)");

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
            if (prev.some((m) => (m._id || m.id) === (msg._id || msg.id))) {
              return prev;
            }
            return [...prev, msg];
          });
        });

        setSocket(socketRef);
      } catch (error) {
        console.error("Lỗi tạo coach session:", error);
      }
    };

    const checkPermission = async () => {
      try {
        const res = await UserService.getUserMembership(userId);
        const code = res?.data?.package_id?.name;
        setMembershipPackageCode(code);
        if (res?.data?.package_id?.can_message_coach) {
          await setupCoachSocket();
        }
      } catch (err) {
        console.error("Không thể kiểm tra quyền:", err);
      }
    };

    checkPermission();

    return () => {
      if (coachSocketRef.current) {
        coachSocketRef.current.off("newMessage");
        coachSocketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !coachSessionId) return;
    coachSocketRef.current.emit("sendMessage", {
      sessionId: coachSessionId,
      content: input,
    });
    setInput("");
  };

  const handleVideoCall = () => {
    if (!coachSessionId || !currentUserId || !coachId) return;
    const link = `${window.location.origin}/call/${currentUserId}-${coachId}`;
    coachSocketRef.current.emit("sendMessage", {
      sessionId: coachSessionId,
      content: `Hãy tham gia cuộc gọi video tại: ${link}`,
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar trái */}
      <div className="w-72 bg-white border-r overflow-y-auto p-4">
        <Title level={4}>Trò chuyện</Title>
        <Divider />
        <List>
          {membershipPackageCode === "pro" && (
            <List.Item className="bg-blue-100 px-2 py-2 rounded-lg">
              <List.Item.Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=coach" />
                }
                title={<Text strong>{coachName}</Text>}
              />
            </List.Item>
          )}
        </List>
      </div>

      {/* Main chat container bên phải */}
      <div className="flex-1 bg-gray-50 p-6 overflow-hidden">
        <Card
          className="h-full shadow-md rounded-2xl flex flex-col"
          bodyStyle={{
            padding: "1.5rem",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
          title={
            <div
              className="flex items-center justify-between"
              style={{ flexShrink: 0 }}
            >
              <div className="flex items-center gap-4">
                <Badge dot color="green">
                  <Avatar
                    size={48}
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${coachName}`}
                  />
                </Badge>
                <div>
                  <Title level={5} className="mb-0">
                    {coachName}
                  </Title>
                  <Text type="secondary">Đang hoạt động</Text>
                </div>
              </div>
              <Button
                icon={<VideoCameraOutlined />}
                onClick={handleVideoCall}
                className="rounded-xl"
                style={{ flexShrink: 0 }}
              >
                Gọi video
              </Button>
            </div>
          }
        >
          {/* Container tin nhắn có scroll */}
          <div
            className="flex-grow overflow-y-auto px-2 pt-4 space-y-4 mb-4"
            style={{ minHeight: 0 }}
          >
            {messages.map((msg, index) => {
              const senderId =
                msg.user_id?._id || msg.user_id || msg.author_id?._id;
              const isOwn = String(senderId) === String(currentUserId);
              return (
                <div
                  key={msg.id || msg._id || index}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[70%]">
                    <div
                      className={`px-4 py-2 rounded-xl break-words ${
                        isOwn
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      <Text>
                        {msg.content.startsWith("http") ? (
                          <a
                            href={msg.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {msg.content}
                          </a>
                        ) : (
                          msg.content
                        )}
                      </Text>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <ClockCircleOutlined className="text-[10px]" />
                      <span>
                        {dayjs(msg.sent_at || msg.timestamp).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input chat */}
          <div
            className="flex items-center gap-2 mt-2"
            style={{ flexShrink: 0 }}
          >
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
              type="primary"
              icon={<SendOutlined />}
              onClick={sendMessage}
              className="rounded-lg"
            >
              Gửi
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommunityPage;
