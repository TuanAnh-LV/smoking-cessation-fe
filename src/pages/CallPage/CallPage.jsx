import React, { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  SpeakerLayout,
  CallControls,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { callId } = useParams(); // /call/:callId
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  const [authUser, setAuthUser] = useState(null); // ví dụ mày lưu user login ở localStorage

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo")); // hoặc context / zustand...
    setAuthUser(user);
  }, []);

  useEffect(() => {
    const initCall = async () => {
      if (!authUser || !callId) return;

      try {
        // 1. Gọi BE lấy token
        const res = await axios.get("/api/video/token", {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });

        const token = res.data.token;

        // 2. Init client
        const client = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: authUser.id,
            name: authUser.full_name,
            image: "", // nếu có avatar thì gắn
          },
          token,
        });

        // 3. Join room
        const call = client.call("default", callId);
        await call.join({ create: true });

        setClient(client);
        setCall(call);
      } catch (err) {
        toast.error("Không thể join call");
        console.error(err);
      }
    };

    initCall();
  }, [authUser, callId]);

  if (!client || !call) return <div>Đang kết nối video call...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default CallPage;
