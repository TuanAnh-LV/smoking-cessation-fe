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
                <div
                  className={`package-price ${item.price === 0 ? "free" : ""}`}
                >
                  {item.price === 0
                    ? "Miễn phí"
                    : item.price.toLocaleString("vi-VN") + " VNĐ"}
                </div>
              </div>
              <p className="package-description">{item.description}</p>
              <ul className="package-features">
                <li>
                  <FaCheck className="check-icon" />
                  Truy cập kế hoạch bỏ thuốc
                </li>
                <li>
                  <FaCheck
                    className="check-icon"
                    style={{ opacity: item.can_use_reminder ? 1 : 0.3 }}
                  />
                  Nhắc nhở hàng ngày
                </li>
                <li>
                  <FaCheck
                    className="check-icon"
                    style={{ opacity: item.can_assign_coach ? 1 : 0.3 }}
                  />
                  Gắn huấn luyện viên cá nhân
                </li>
                <li>
                  <FaCheck
                    className="check-icon"
                    style={{ opacity: item.can_earn_special_badges ? 1 : 0.3 }}
                  />
                  Huy hiệu đặc biệt
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
        </div>
      </div>
    </div>
  );
};

export default CardMemberSection;
