import React, { useEffect, useState } from "react";
import "./cardMember.scss";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { MembershipService } from "../../services/membership.service";

const CardMemberSection = () => {
  const navigate = useNavigate();
  const [membership, setMembership] = useState([]);

  useEffect(() => {
    MembershipService.getAllMemberships()
      .then((res) => {
        if (Array.isArray(res)) {
          setMembership(res);
        } else if (res.data && Array.isArray(res.data)) {
          setMembership(res.data);
        } else {
          console.warn("API returned invalid format");
          setMembership([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch memberships:", err);
      });
  }, []);

  const handleUpgrade = (packageInfo) => {
    navigate("/payment", { state: packageInfo });
  };

  return (
    <div className="card-member-section">
      <div className="container">
        <h2>Upgrade now</h2>
        <div className="cards-container">
          {/* Gói Tiêu Chuẩn */}
          {membership.map((item) => (
            <div key={item._id} className="member-card standard">
              <div className="package-header">
                <span className="package-title">{item.name}</span>
              </div>
              <div className="package-price free">{item.price} VNĐ</div>
              <p className="package-description">{item.description}</p>
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
              <button
                className="package-button"
                onClick={() =>
                  handleUpgrade({
                    _id: item._id,
                    title: item.name,
                    price: item.price,
                    desc: item.description,
                    date: new Date().toLocaleDateString("vi-VN"),
                  })
                }
              >
                {item.price == 0 ? "Free" : "Upgrade now"}
              </button>
            </div>
          ))}

          {/* Gói 12 tháng */}
          {/* <div className="member-card yearly">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CardMemberSection;
