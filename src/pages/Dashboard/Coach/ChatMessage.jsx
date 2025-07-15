import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Avatar,
  Typography,
  Input,
  Button,
  List,
  Badge,
  Divider,
  message as AntMessage,
} from "antd";
import {
  SendOutlined,
  VideoCameraOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { ChatService } from "../../../services/chat.service";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ChatMessage = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const token = localStorage.getItem("token");
  const [currentCoachId, setCurrentCoachId] = useState(null);

  useEffect(() => {
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setCurrentCoachId(decoded.id);

    socketRef.current = io(`${import.meta.env.VITE_SOCKET_URL}/coach`, {
      auth: { token },
    });

    socketRef.current.on("connect", () => {
      console.log("[Coach] Socket connected");
    });

    socketRef.current.on("newMessage", (msg) => {
      if (selectedChat && msg.session_id === selectedChat._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [selectedChat]);

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const fetchChatSessions = async () => {
    try {
      const res = await ChatService.getSessionByCoach();
      setChatList(res?.data?.data || []);
      if (res?.data?.data?.length > 0) selectChat(res.data.data[0]);
    } catch (err) {
      AntMessage.error("Không thể tải danh sách phiên chat");
    }
  };

  const selectChat = async (session) => {
    setSelectedChat(session);
    try {
      const res = await ChatService.getMessages(session._id);
      setMessages(res?.data?.data || []);
      socketRef.current.emit("joinSession", session._id);
    } catch (err) {
      AntMessage.error("Không thể tải tin nhắn");
    }
  };

  const handleSend = () => {
    if (!input.trim() || !selectedChat) return;
    socketRef.current.emit("sendMessage", {
      sessionId: selectedChat._id,
      content: input,
    });
    setInput("");
  };

  const handleVideoCall = () => {
    // Tạo đường link video call chung cho cả user và coach
    const callLink = `http://localhost:5173/call/${selectedChat?.user_id?._id}-${currentCoachId}`;

    // Gửi đường link video call vào tin nhắn
    socketRef.current.emit("sendMessage", {
      sessionId: selectedChat._id,
      content: `Hãy tham gia cuộc gọi video chung tại: ${callLink}`,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-white border-r overflow-y-auto p-4">
        <Title level={4}>Trò chuyện</Title>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={chatList}
          renderItem={(item) => (
            <List.Item
              className={`cursor-pointer rounded-lg px-2 py-2 ${
                selectedChat?._id === item._id ? "bg-blue-100" : ""
              }`}
              onClick={() => selectChat(item)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.user_id.full_name}`}
                  />
                }
                title={
                  <Text className="font-medium">{item.user_id.full_name}</Text>
                }
                description={<Text type="secondary">{item.user_id.email}</Text>}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {selectedChat && (
          <Card
            className="h-full shadow-md rounded-2xl flex flex-col"
            bodyStyle={{
              padding: "1.5rem",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge dot={true} color="green">
                    <Avatar
                      size={48}
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${selectedChat.user_id.full_name}`}
                    />
                  </Badge>
                  <div>
                    <Title level={5} className="mb-0">
                      {selectedChat.user_id.full_name}
                    </Title>
                    <Text type="secondary">Đang hoạt động</Text>
                  </div>
                </div>
                <Button
                  icon={<VideoCameraOutlined />}
                  onClick={handleVideoCall} // Gửi đường link video call
                  className="rounded-xl"
                >
                  Gọi video
                </Button>
              </div>
            }
          >
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
              {messages.map((msg) => {
                const isMe =
                  msg.user_id === currentCoachId ||
                  msg.user_id?._id === currentCoachId;
                return (
                  <div
                    key={msg._id || msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[70%]">
                      <div
                        className={`px-4 py-2 rounded-xl ${
                          isMe
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        <Text>{msg.content}</Text>
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
            </div>

            <div className="flex items-center gap-2 mt-2">
              <TextArea
                rows={1}
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex-1 rounded-lg"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                className="rounded-lg"
              >
                Gửi
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
