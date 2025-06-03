import React, { useState } from "react";
import "./PaymentPage.scss";
import paypal from "../../assets/paypal.png";
import momo from "../../assets/momo.png";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Payment Information */}
        <div className="payment-info-card">
          <h2 className="section-title">Payment information</h2>
          <form className="payment-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Nguyen Van A" />
            </div>
            <div className="form-group">
              <label htmlFor="taxCode">
                Tax code <span className="info-icon">i</span>
              </label>
              <input type="text" id="taxCode" placeholder="4455669935949" />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">
                Phone Number <span className="info-icon">i</span>
              </label>
              <input type="text" id="phoneNumber" placeholder="4455669935949" />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="info-icon">i</span>
              </label>
              <input type="email" id="email" placeholder="abc@gmail.com" />
            </div>
          </form>
        </div>

        {/* Payment Method */}
        <div className="payment-method-card">
          <h2 className="section-title">Payment method</h2>
          <div className="payment-method-options">
            <label
              className={`method-option ${
                paymentMethod === "card" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Pay-pal
              <span className="card-icons">
                <img src={paypal} alt="Visa" />
              </span>
            </label>
            <label
              className={`method-option ${
                paymentMethod === "momo" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
              />
              Momo e-wallet
              <span className="momo-icon">
                <img src={momo} alt="Momo" />
              </span>
            </label>
          </div>
          <div className="payment-help">
            Having trouble paying? <a href="#">See this article</a>
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details-card">
          <h2 className="section-title">Order details</h2>
          <div className="membership-package">
            <div className="package-info">
              <span className="package-title">Membership Package</span>
              <span className="package-price">499.000đ</span>
            </div>
            <div className="package-desc">1 month</div>
            <div className="package-date">17/06/2025 - 17/06/2025</div>
          </div>
          <div className="form-group">
            <label htmlFor="discountCode">Discount code</label>
            <input type="text" id="discountCode" placeholder="MOCAEXE2" />
          </div>
          <div className="order-total-row">
            <span>Total</span>
            <span className="order-total">499.000 VND</span>
          </div>
          <button className="confirm-payment-btn">
            Confirmation and Payment
          </button>
          <div className="order-note">
            Your subscription will automatically renew each month with a
            payment. By clicking 'Confirm and Pay' you agree to the Terms and
            Conditions
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
