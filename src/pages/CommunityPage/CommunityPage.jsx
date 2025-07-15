import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { CommunityService } from "../../services/community.service";
import { ChatService } from "../../services/chat.service";
import CoachChat from "../../components/Community/CoachChat";
import "./CommunityPage.scss";

const CommunityPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("community");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(decoded.id);

    CommunityService.getMessages()
      .then((res) => {
        if (Array.isArray(res)) {
          setMessages(res);
        } else if (res.data && Array.isArray(res.data)) {
          setMessages(res.data);
        } else {
          setMessages([]);
        }
      })
      .catch(() => setMessages([]));

    const newSocket = io(`${import.meta.env.VITE_SOCKET_URL}/community`, {
      auth: { token },
    });
    setSocket(newSocket);

    newSocket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    socket.emit("chat message", { message: inputMessage });
    setInputMessage("");
  };

  return (
    <div className="community-page">
      <div className="community-page__tabs">
        <button
          className={activeTab === "community" ? "active" : ""}
          onClick={() => setActiveTab("community")}
        >
          Cộng đồng
        </button>
        <button
          className={activeTab === "coach" ? "active" : ""}
          onClick={() => setActiveTab("coach")}
        >
          Coach
        </button>
      </div>

      <div className="community-page__chat-wrapper">
        {activeTab === "community" && (
          <div className="community-chat-wrapper">
            <div className="community-chat">
              <div className="community-chat__header">
                <span>Chat cộng đồng</span>
              </div>
              <div className="community-chat__messages">
                {messages.map((msg, index) => {
                  if (!msg.author_id) return null;
                  const isOwn =
                    msg.author_id.id === currentUserId ||
                    msg.author_id._id === currentUserId;
                  const avatarText = msg.author_id.full_name
                    ? msg.author_id.full_name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "??";
                  return (
                    <div
                      key={msg.id || msg._id || index}
                      className={`chat-message ${
                        isOwn ? "chat-message--own" : ""
                      }`}
                    >
                      <span className="chat-message__avatar">{avatarText}</span>
                      <div className="chat-message__content">
                        <span className="chat-message__author">
                          {msg.author_id.full_name}
                        </span>
                        <div>{msg.content}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="community-chat__input">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn của bạn..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="community-chat__send-btn"
                  onClick={sendMessage}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "coach" && <CoachChat userId={currentUserId} />}
      </div>
    </div>
  );
};

export default CommunityPage;
