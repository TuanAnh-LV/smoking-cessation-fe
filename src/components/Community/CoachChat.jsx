import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ChatService } from "../../services/chat.service";
import CoachVideoCall from "./CoachVideoCall";
import { VideoIcon } from "lucide-react";
import "./CoachChat.scss"; // nếu style nằm riêng
// hoặc dùng lại CommunityPage.scss nếu chung class

const CoachChat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [showCall, setShowCall] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const setupChat = async () => {
      try {
        const response = await ChatService.getOrCreateSession();
        const sessionData = response?.data?.data;
        const sid = sessionData?._id;
        if (!sid) return;

        setSessionId(sid);

        const msgRes = await ChatService.getMessages(sid);
        setMessages(msgRes?.data?.data || []);

        socketRef.current = io("http://localhost:3000/coach", {
          auth: { token },
        });

        socketRef.current.on("connect", () => {
          socketRef.current.emit("joinSession", sid);
        });

        socketRef.current.on("newMessage", (msg) => {
          setMessages((prev) => [...prev, msg]);
        });
      } catch (err) {
        console.error("Lỗi setup chat:", err);
      }
    };

    setupChat();
    return () => socketRef.current?.disconnect();
  }, []);

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !sessionId) return;
    socketRef.current.emit("sendMessage", { sessionId, content: input });
    setInput("");
  };

  const getAvatarText = (name = "") => {
    const words = name.split(" ");
    if (words.length === 0) return "??";
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="community-page">
      <div className="coach-chat-wrapper">
        <div className="community-chat">
          <div className="community-chat__header">
            <span>Chat với Coach</span>
            <button
              onClick={() => setShowCall(true)}
              className="community-chat__video-btn"
            >
              <VideoIcon className="video-icon" />
              Gọi video
            </button>
          </div>

          <div className="community-chat__messages">
            {messages.map((msg, idx) => {
              const senderId = msg.user_id?._id || msg.user_id || msg.author?._id;
              const senderName = msg.author?.full_name || msg.user_id?.full_name || "Coach";
              const isOwn = String(senderId) === String(userId);
              const avatar = getAvatarText(senderName);

              return (
                <div
                  key={idx}
                  className={`chat-message ${isOwn ? "chat-message--own" : ""}`}
                >
                  <span className="chat-message__avatar">{avatar}</span>
                  <div className="chat-message__content">
                    <span className="chat-message__author">{senderName}</span>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhắn gì đó..."
            />
            <button className="community-chat__send-btn" onClick={sendMessage}>
              Gửi
            </button>
          </div>
        </div>
      </div>

      {showCall && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="w-full h-full max-w-screen-lg bg-zinc-900 shadow-lg relative">
            <button
              onClick={() => setShowCall(false)}
              className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
            >
              Đóng
            </button>
            <CoachVideoCall />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachChat;


