import React, { useEffect, useState } from "react";
import "./ProfilePage.scss"; // Tạo file này để chứa CSS đẹp
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import { UserService } from "../../services/user.service";
import { useAuth } from "../../context/authContext";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userInfo } = useAuth();
  useEffect(() => {
    UserService.getCurrentUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, [userInfo]);

  if (!user) return <div className="profile-section">Loading...</div>;

  return (
    <div>
      <div className="profile-section">
        <div className="profile-card">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className="profile-avatar"
          />
          <h2 className="profile-name">{user.full_name}</h2>
          <p className="profile-username">@{user.full_name}</p>
          <div className="profile-info">
            <div>
              <span>
                Email:<p>{user.email}</p>
              </span>
            </div>
            <div>
              <span>
                Birth date:
                <p>{new Date(user.birth_date).toLocaleDateString()}</p>
              </span>
            </div>
            <div>
              <span>
                Gender: <p>{user.gender}</p>
              </span>
            </div>
            <div>
              <span>
                Joined: <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </span>{" "}
            </div>
          </div>
          <button className="profile-edit-btn">Edit Profile</button>
        </div>
      </div>
      <TransactionHistory />
    </div>
  );
};

export default ProfilePage;
