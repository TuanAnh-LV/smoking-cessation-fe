import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("⏳ Đang xác minh email...");
  const hasRedirected = useRef(false);
  const done = useRef(false); // ⚠️ Ngăn xử lý sau khi đã xong

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("❌ Không có token được cung cấp.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await AuthService.verifyEmail(token);
        const message = res?.message?.toLowerCase();

        if (message.includes("verified")) {
          done.current = true;
          setStatus("✅ Xác minh thành công! Đang chuyển hướng...");
          if (!hasRedirected.current) {
            hasRedirected.current = true;
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          }
        } else {
          setStatus(
            "⚠️ " + (res.message || "Email đã được xác minh trước đó.")
          );
        }
      } catch (err) {
        if (done.current) return; // ⚠️ Đã xong, không xử lý lỗi nữa
        const errorMsg =
          err?.response?.data?.error || err?.message || "❌ Xác minh thất bại.";
        if (
          errorMsg.toLowerCase().includes("expired") ||
          errorMsg.toLowerCase().includes("invalid")
        ) {
          setStatus("⚠️ Link đã hết hạn hoặc không hợp lệ.");
        } else {
          setStatus("❌ " + errorMsg);
        }
      }
    };

    verifyEmail();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Xác minh email</h2>
      <p style={{ fontSize: "1.2rem" }}>{status}</p>
    </div>
  );
}

export default VerifyEmailPage;
