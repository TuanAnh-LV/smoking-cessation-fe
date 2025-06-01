import React from 'react';
import './cardMember.scss'; // Import the SCSS file
import { FaCheck } from "react-icons/fa"; // Assuming you have react-icons installed

const CardMemberSection = () => {
  return (
    <div className="card-member-section">
      <div className="container">
        <h2>Nâng cấp ngay</h2>
        <div className="cards-container">

          {/* Gói Tiêu Chuẩn */}
          <div className="member-card standard">
            <div className="package-header">
              <span className="package-title">Standard package  </span>
            </div>
            <div className="package-price free">Free</div>
            <p className="package-description">For those who want to learn and monitor the process of quitting smoking</p>
            <ul className="package-features">
              <li><FaCheck className="check-icon" /> ........</li>
              <li><FaCheck className="check-icon" /> ............</li>
              <li><FaCheck className="check-icon" /> ..........</li>
              <li><FaCheck className="check-icon" /> .....................</li>
            </ul>
            <button className="package-button">Phiên bản đang sử dụng</button>
          </div>

          {/* Gói 1 tháng */}
          <div className="member-card monthly">
             <div className="package-header">
              <span className="package-title-2">1 month package </span>
              <span className="package-badge">Preferential price</span>
            </div>
            <div className="package-price">499.000VNĐ</div>
             <p className="package-description">Ready to answer all questions and create a detox plan. Connect with coaches anytime, anywhere.</p>
            <ul className="package-features">
              <li><FaCheck className="check-icon" /> .................................</li>
              <li><FaCheck className="check-icon" /> .................................................</li>
              <li><FaCheck className="check-icon" /> ....................................</li>
              <li><FaCheck className="check-icon" /> .................................</li>
            </ul>
            <button className="package-button primary">Upgrade now</button>
          </div>

          {/* Gói 12 tháng */}
          <div className="member-card yearly">
             <div className="package-header">
              <span className="package-title-2">12 month package</span>
            </div>
            <div className="package-price">4.399.000VNĐ</div>
             <p className="package-description">............................................................................</p>
            <ul className="package-features">
              <li><FaCheck className="check-icon" />.......................................</li>
              <li><FaCheck className="check-icon" /> .................................................</li>
              <li><FaCheck className="check-icon" /> .......................................................</li>
              <li><FaCheck className="check-icon" /> ..............................................</li>
               <li><FaCheck className="check-icon" /> ......................................................</li>
            </ul>
            <button className="package-button super">Upgrade now</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardMemberSection;