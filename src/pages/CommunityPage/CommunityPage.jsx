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
} from "antd";
import {
  SendOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { CommunityService } from "../../services/community.service";
import { ChatService } from "../../services/chat.service";
import { UserService } from "../../services/user.service";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CommunityPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("community");
  const messagesEndRef = useRef(null);
  const [coachMessages, setCoachMessages] = useState([]);
  const [coachSessionId, setCoachSessionId] = useState(null);
  const [coachName, setCoachName] = useState("Coach");
  const [coachId, setCoachId] = useState(null);
  const coachSocketRef = useRef(null);
  const [coachInput, setCoachInput] = useState("");
  const [membershipPackageCode, setMembershipPackageCode] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.id;
    setCurrentUserId(userId);

    // 1. Lấy tin nhắn cộng đồng
    CommunityService.getMessages()
      .then((res) => {
        const data = Array.isArray(res?.data) ? res.data : res;
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch(() => setMessages([]));

    // 2. Kết nối socket cộng đồng
    const communitySocket = io(`${import.meta.env.VITE_SOCKET_URL}/community`, {
      auth: { token },
    });
    setSocket(communitySocket);

    communitySocket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 3. Tạo socket coach — chỉ khi có quyền
    const setupCoachSocket = async () => {
      try {
        const res = await ChatService.getOrCreateSession();
        const session = res?.data?.data;
        if (!session?._id) return;

        setCoachSessionId(session._id);
        setCoachId(session.coach_id?._id);
        setCoachName(session.coach_id?.full_name || "Coach");

        const msgRes = await ChatService.getMessages(session._id);
        setCoachMessages(msgRes?.data?.data || []);

        const socketRef = io(`${import.meta.env.VITE_SOCKET_URL}/coach`, {
          auth: { token },
        });
        coachSocketRef.current = socketRef;

        socketRef.on("connect", () => {
          socketRef.emit("joinSession", session._id);
        });

        socketRef.on("newMessage", (msg) => {
          setCoachMessages((prev) => [...prev, msg]);
        });
      } catch (error) {
        console.error("Lỗi khởi tạo Coach Chat:", error);
      }
    };

    // 4. Kiểm tra membership
    const checkMembershipAndSetup = async () => {
      try {
        const res = await UserService.getUserMembership(userId);
        const permissions = res?.data?.package_id?.permissions || [];
        if (permissions.includes("can_chat_coach")) {
          setupCoachSocket();
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra quyền coach:", err);
      }
    };

    checkMembershipAndSetup();

    return () => {
      communitySocket.disconnect();
      coachSocketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        if (!currentUserId) return;
        const res = await UserService.getUserMembership(currentUserId);
        const code = res?.data?.package_id?.name;
        setMembershipPackageCode(code);
      } catch (err) {
        console.error("Failed to fetch membership", err);
      }
    };

    fetchMembership();
  }, [currentUserId]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    socket.emit("chat message", { message: inputMessage });
    setInputMessage("");
  };

  const sendCoachMessage = () => {
    if (!coachInput.trim() || !coachSessionId) return;
    coachSocketRef.current.emit("sendMessage", {
      sessionId: coachSessionId,
      content: coachInput,
    });
    setCoachInput("");
  };

  const handleVideoCall = () => {
    if (!coachSessionId || !currentUserId || !coachId) return;
    const callLink = `http://localhost:5173/call/${currentUserId}-${coachId}`;
    coachSocketRef.current.emit("sendMessage", {
      sessionId: coachSessionId,
      content: `Hãy tham gia cuộc gọi video tại: ${callLink}`,
    });
  };

  const renderMessages = (msgs) => (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
      {msgs.map((msg, index) => {
        const senderId = msg.user_id?._id || msg.user_id || msg.author_id?._id;
        const isOwn = String(senderId) === String(currentUserId);
        return (
          <div
            key={msg.id || msg._id || index}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[70%]">
              <div
                className={`px-4 py-2 rounded-xl ${
                  isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
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
      <div ref={messagesEndRef} />
    </div>
  );

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-white border-r overflow-y-auto p-4">
        <Title level={4}>Trò chuyện</Title>
        <Divider />
        <List>
          <List.Item
            className={`cursor-pointer px-2 py-2 rounded-lg ${
              activeTab === "community" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveTab("community")}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=community" />
              }
              title={<Text strong>Cộng đồng</Text>}
            />
          </List.Item>
          {membershipPackageCode === "pro" && (
            <List.Item
              className={`cursor-pointer px-2 py-2 rounded-lg ${
                activeTab === "coach" ? "bg-blue-100" : ""
              }`}
              onClick={() => setActiveTab("coach")}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=coach" />
                }
                title={<Text strong>Coach</Text>}
              />
            </List.Item>
          )}
        </List>
      </div>

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {(activeTab === "community" || activeTab === "coach") && (
          <Card
            className="h-full shadow-md rounded-2xl flex flex-col"
            bodyStyle={{
              padding: "1.5rem",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
            title={
              activeTab === "coach" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge dot={true} color="green">
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
                  >
                    Gọi video
                  </Button>
                </div>
              ) : (
                <Text strong>Chat cộng đồng</Text>
              )
            }
          >
            {renderMessages(
              activeTab === "community" ? messages : coachMessages
            )}
            <div className="flex items-center gap-2 mt-2">
              <TextArea
                rows={1}
                placeholder="Nhập tin nhắn..."
                value={activeTab === "community" ? inputMessage : coachInput}
                onChange={(e) =>
                  activeTab === "community"
                    ? setInputMessage(e.target.value)
                    : setCoachInput(e.target.value)
                }
                onPressEnter={(e) => {
                  e.preventDefault();
                  activeTab === "community"
                    ? sendMessage()
                    : sendCoachMessage();
                }}
                className="flex-1 rounded-lg"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={
                  activeTab === "community" ? sendMessage : sendCoachMessage
                }
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

export default CommunityPage;
