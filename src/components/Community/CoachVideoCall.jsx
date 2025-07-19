import React, { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from "axios";
import { StreamVideoClient } from "@stream-io/video-react-sdk"; // Đảm bảo import đúng cách

const CoachVideoCall = () => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupCall = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Không tìm thấy token");

        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.id;
        const full_name = decoded.full_name || "User";

        const res = await axios.get(
          `${import.meta.env.VITE_SOCKET_URL}/api/video/token`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Khởi tạo StreamVideoClient bằng từ khóa `new`
        const streamClient = new StreamVideoClient({
          apiKey: import.meta.env.VITE_STREAM_API_KEY,
          user: { id: userId, name: full_name },
          token: res.data.token,
        });

        const callInstance = streamClient.call("default", `coach-${userId}`);
        await callInstance.getOrCreate();
        await callInstance.join();

        setClient(streamClient);
        setCall(callInstance);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi kết nối video call:", err);
        setLoading(false);
      }
    };

    setupCall();

    return () => {
      call?.leave?.();
      client?.disconnectUser?.();
    };
  }, []);

  if (loading)
    return <div style={{ padding: "1rem" }}>🔄 Đang kết nối cuộc gọi...</div>;
  if (!client || !call) return <div>Không thể thiết lập cuộc gọi.</div>;

  return (
    <StreamTheme>
      <StreamVideo>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamVideo>
    </StreamTheme>
  );
};

export default CoachVideoCall;
