import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { CommunityService } from "../../services/community.service";
import "./CommunityPage.scss";

const CommunityPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(decoded.id);

    // Load history messages
    CommunityService.getMessages()
      .then((res) => {
        if (Array.isArray(res)) {
          setMessages(res);
        } else if (res.data && Array.isArray(res.data)) {
          setMessages(res.data);
        } else {
          console.warn("API returned invalid format, setting empty messages");
          setMessages([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load messages", err);
        setMessages([]);
      });

    const newSocket = io("https://smoking-cessation-backend.onrender.com", {
      auth: { token },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {});

    newSocket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("disconnect", () => {});

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    socket.emit("chat message", { message: inputMessage });
    setInputMessage("");
  };

  return (
    <div className="community-page">
      <div className="community-page__header">
        <h1>Community</h1>
        <button className="community-page__join-btn">
          Join the support group
        </button>
      </div>
      <div className="community-page__content">
        <div className="community-page__left">
          <div className="share-story">
            <h2>Share your story</h2>
            <textarea placeholder="Share your progress, feelings or tips with the community..." />
            <div className="achievement-list">
              <div className="achievement-item">🏆 1 month of perseverance</div>
              <div className="achievement-item">⭐ 1 week clean</div>
              <div className="achievement-item">❤️ Encourager</div>
              <div className="achievement-item">🥈 Take a deep breath</div>
            </div>
            <button className="share-story__btn">Post</button>
          </div>
        </div>

        <div className="community-page__right">
          <div className="community-chat">
            <div className="community-chat__header">
              <span>Chat cộng đồng</span>
              <span className="community-chat__online">Đang online</span>
            </div>
            <div className="community-chat__messages">
              {messages.map((msg, index) => {
                if (!msg.author_id) {
                  console.warn("Message missing author_id:", msg);
                  return null;
                }

                const isOwn = msg.author_id._id === currentUserId;
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
                    key={msg._id || index}
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
      </div>
    </div>
  );
};

export default CommunityPage;
