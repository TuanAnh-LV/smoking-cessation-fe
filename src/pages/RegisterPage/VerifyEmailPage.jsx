import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");
  const hasRun = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("No token was provided.");
      return;
    }

    if (hasRun.current) return;
    hasRun.current = true;

    const verifyEmail = async () => {
      try {
        const res = await AuthService.verifyEmail(token);
        const message = res?.message?.toLowerCase?.() || "";

        if (message.includes("verified")) {
          setStatus("Email verified successfully. Redirecting to login...");
        } else if (message.includes("already")) {
          setStatus("Your email has already been verified. Redirecting...");
        } else {
          setStatus(res.message || "Verification completed.");
        }

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } catch (err) {
        const errorMsg =
          err?.response?.data?.error ||
          err?.message ||
          "Email verification failed.";

        const msg = errorMsg.toLowerCase();
        if (msg.includes("expired") || msg.includes("invalid")) {
          setStatus("The verification link is invalid or has expired.");
        } else if (msg.includes("already")) {
          setStatus("Your email has already been verified.");
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        } else {
          setStatus(errorMsg);
        }
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Email Verification</h2>
      <p style={{ fontSize: "1.2rem" }}>{status}</p>
    </div>
  );
}

export default VerifyEmailPage;
