import React from "react";
import "./cardMember.scss"; // Import the SCSS file
import { FaCheck } from "react-icons/fa"; // Assuming you have react-icons installed
import { useNavigate } from "react-router-dom";

const CardMemberSection = () => {
  const navigate = useNavigate();

  const handleUpgrade = (packageInfo) => {
    navigate("/payment", { state: packageInfo });
  };

  return (
    <div className="card-member-section">
      <div className="container">
        <h2>Upgrade now</h2>
        <div className="cards-container">
          {/* Gói Tiêu Chuẩn */}
          <div className="member-card standard">
            <div className="package-header">
              <span className="package-title">Standard package </span>
            </div>
            <div className="package-price free">Free</div>
            <p className="package-description">
              For those who want to learn and monitor the process of quitting
              smoking
            </p>
            <ul className="package-features">
              <li>
                <FaCheck className="check-icon" /> ........
              </li>
              <li>
                <FaCheck className="check-icon" /> ............
              </li>
              <li>
                <FaCheck className="check-icon" /> ..........
              </li>
              <li>
                <FaCheck className="check-icon" /> .....................
              </li>
            </ul>
            <button className="package-button">Try it</button>
          </div>

          {/* Gói 12 tháng */}
          <div className="member-card yearly">
            <div className="package-header">
              <span className="package-title-2">12 month package</span>
            </div>
            <div className="package-price">499.000VNĐ</div>
            <p className="package-description">
              ............................................................................
            </p>
            <ul className="package-features">
              <li>
                <FaCheck className="check-icon" />
                .......................................
              </li>
              <li>
                <FaCheck className="check-icon" />{" "}
                .................................................
              </li>
              <li>
                <FaCheck className="check-icon" />{" "}
                .......................................................
              </li>
              <li>
                <FaCheck className="check-icon" />{" "}
                ..............................................
              </li>
              <li>
                <FaCheck className="check-icon" />{" "}
                ......................................................
              </li>
            </ul>
            <button
              className="package-button super"
              onClick={() =>
                handleUpgrade({
                  title: "12 month package",
                  price: 4399000,
                  desc: "12 tháng",
                  date: "17/06/2024 - 17/06/2025",
                })
              }
            >
              Upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMemberSection;
