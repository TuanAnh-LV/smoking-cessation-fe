import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Input,
  Button,
  Modal,
  List,
  Badge,
  Divider,
} from "antd";
import {
  SendOutlined,
  VideoCameraOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;

const mockChatList = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    lastMessage: "Coach ơi hôm nay em ổn hơn nhiều rồi",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=A",
    online: true,
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Lê Thị B",
    lastMessage: "Em vẫn thèm thuốc nhiều quá...",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=B",
    online: false,
    unreadCount: 0,
  },
];

const ChatMessage = () => {
  const [selectedChat, setSelectedChat] = useState(mockChatList[0]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Chào bạn, hôm nay bạn thấy sao?",
      isMe: true,
      timestamp: dayjs().subtract(2, "minute").format("HH:mm"),
    },
    {
      id: 2,
      content: "Em ổn hơn rồi ạ!",
      isMe: false,
      timestamp: dayjs().format("HH:mm"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          content: input,
          isMe: true,
          timestamp: dayjs().format("HH:mm"),
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r overflow-y-auto p-4">
        <Title level={4}>Trò chuyện</Title>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={mockChatList}
          renderItem={(item) => (
            <List.Item
              className={`cursor-pointer rounded-lg px-2 py-2 ${
                selectedChat.id === item.id ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                setSelectedChat(item);
                setMessages([
                  {
                    id: 1,
                    content: "Chào bạn, hôm nay bạn thấy sao?",
                    isMe: true,
                    timestamp: dayjs().format("HH:mm"),
                  },
                  {
                    id: 2,
                    content: item.lastMessage,
                    isMe: false,
                    timestamp: dayjs().format("HH:mm"),
                  },
                ]);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Badge
                    dot
                    color="green"
                    offset={[-4, 4]}
                    status={item.online ? "success" : "default"}
                  >
                    <Avatar src={item.avatar} />
                  </Badge>
                }
                title={
                  <div className="flex justify-between">
                    <Text className="font-medium">{item.name}</Text>
                    {item.unreadCount > 0 && (
                      <Badge
                        count={item.unreadCount}
                        className="ml-2"
                        style={{ backgroundColor: "#f5222d" }}
                      />
                    )}
                  </div>
                }
                description={<Text type="secondary">{item.lastMessage}</Text>}
              />
            </List.Item>
          )}
        />
      </div>

      {/* Chat Panel */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
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
                <Badge dot={selectedChat.online} color="green">
                  <Avatar size={48} src={selectedChat.avatar} />
                </Badge>
                <div>
                  <Title level={5} className="mb-0">
                    {selectedChat.name}
                  </Title>
                  <Text type="secondary">
                    {selectedChat.online ? "Đang hoạt động" : "Ngoại tuyến"}
                  </Text>
                </div>
              </div>
              <Button
                icon={<VideoCameraOutlined />}
                onClick={() => setIsVideoModalOpen(true)}
                className="rounded-xl"
              >
                Gọi video
              </Button>
            </div>
          }
        >
          {/* Chat content */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[70%]">
                  <div
                    className={`px-4 py-2 rounded-xl ${
                      msg.isMe
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    <Text>{msg.content}</Text>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <ClockCircleOutlined className="text-[10px]" />
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
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
      </div>

      {/* Modal Video */}
      <Modal
        title={`Cuộc gọi video với ${selectedChat.name}`}
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        centered
      >
        <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center text-white">
          <p className="text-lg">[Placeholder video call]</p>
        </div>
      </Modal>
    </div>
  );
};

export default ChatMessage;
