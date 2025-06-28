import React, { useState, useEffect, useRef } from "react";
import "./header.scss";
import LogoBlack from "../../assets/LogoBlack.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
// import socket from "../../utils/socket";
import NotificationDropdown from "../NotificationSettings/NotificationDropdown";
import { NotificationService } from "../../services/notification.service";

const Header = () => {
  const navigate = useNavigate();
  const {
    token,
    logout,
    role,
    userInfo,
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount,
  } = useAuth();

  const isLoggedIn = !!token;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [planId, setPlanId] = useState(localStorage.getItem("currentPlanId"));

  const [showDropdown, setShowDropdown] = useState(false);

  const profileRef = useRef();
  const dropdownRef = useRef();
  // Gọi API lấy tất cả thông báo khi login
  console.log("📌 Header is rendered");

  useEffect(() => {
    if (!isLoggedIn || !userInfo?._id) return;

    NotificationService.getAll().then((res) => {
      const data = res.data; // 👈 Lấy ra mảng từ res
      console.log("✅ Notifications:", data);
      if (Array.isArray(data)) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.is_read).length);
      } else {
        console.warn("⚠️ Không phải mảng:", data);
        setNotifications([]);
      }
    });
  }, [isLoggedIn, userInfo?._id]);

  // Thiết lập socket
  // useEffect(() => {
  //   if (!isLoggedIn || !userInfo?._id) return;

  //   socket.connect();
  //   socket.emit("join", userInfo._id);

  //   socket.on("newNotification", (noti) => {
  //     setNotifications((prev) => [noti, ...prev]);
  //     setUnreadCount((prev) => prev + 1);
  //     toast.info(`🔔 ${noti.title}`);
  //   });

  //   return () => {
  //     socket.off("newNotification");
  //     socket.disconnect();
  //   };
  // }, [isLoggedIn, userInfo?._id]);

  // Lấy planId khi localStorage thay đổi
  useEffect(() => {
    const handler = () => setPlanId(localStorage.getItem("currentPlanId"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClearNotifications = async () => {
    try {
      await NotificationService.deleteAll();
      setNotifications([]);
      setUnreadCount(0);
      console.log("🧹 Tất cả thông báo đã được xoá.");
    } catch (err) {
      console.error("❌ Xóa tất thất bại:", err);
    }
  };

  const handleNotificationClick = async (noti) => {
    if (!noti.is_read) {
      await NotificationService.markAsRead(noti._id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === noti._id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }
    console.log("🔔 Clicked:", noti);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="header">
      <img src={LogoBlack} alt="Quit Smoking Logo" className="logo" />

      <div
        className="hamburger-menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <HiOutlineMenuAlt3 className="icon" />
      </div>

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/community">
          <p>Community</p>
        </Link>
        <Link to="/achievements">
          <p>Achievements</p>
        </Link>
        <Link to={planId ? `/progress/${planId}` : "/status"}>
          Track Progress
        </Link>
        <Link to="/status">
          <p>Quit Plan</p>
        </Link>
        <Link to="/coach">
          <p>Coach</p>
        </Link>
      </div>

      {isLoggedIn ? (
        <div className="logged-in-icons" ref={profileRef}>
          <div className="relative" ref={dropdownRef}>
            <button
              className="notification-button"
              onClick={handleToggleDropdown}
            >
              <IoMdNotificationsOutline className="icon" />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {showDropdown && (
              <NotificationDropdown
                notifications={notifications}
                onClear={handleClearNotifications}
                onClickItem={handleNotificationClick}
                setNotifications={setNotifications}
                setUnreadCount={setUnreadCount}
              />
            )}
          </div>

          <div className="user-avatar relative">
            <FaRegUserCircle
              className="icon cursor-pointer"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            />
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 p-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Profile
                </Link>
                {role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {role === "coach" && (
                  <Link
                    to="/coach"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Coach Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="logout-button">
            <FiLogOut className="icon" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
          <Link to="/register">
            <button className="register">Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
