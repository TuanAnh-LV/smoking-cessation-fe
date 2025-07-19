import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PaymentService } from "../../services/payment.service";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("token");
  const [status, setStatus] = useState("processing"); // processing | success | fail

  useEffect(() => {
    if (orderId) {
      PaymentService.acceptPaypalOrder({ orderId })
        .then((res) => {
          console.log("Capture success:", res);
          setStatus("success");
        })
        .catch((err) => {
          console.error("Capture failed:", err);
          setStatus("fail");
        });
    } else {
      console.error("No orderId found in URL");
      setStatus("fail");
    }
  }, [orderId]);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="payment-success-page">
      {status === "processing" && <p>⏳ Processing your payment...</p>}

      {status === "success" && (
        <div className="payment-success">
          <h2>🎉 Payment Successful!</h2>
          <p>
            Thank you for your purchase. Your membership has been activated.
          </p>
          <button onClick={goHome} className="go-home-btn">
            Go to Home
          </button>
        </div>
      )}

      {status === "fail" && (
        <div className="payment-fail">
          <h2>❌ Payment Failed</h2>
          <p>
            There was a problem completing your payment. Please try again or
            contact support.
          </p>
          <button onClick={goHome} className="go-home-btn">
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
