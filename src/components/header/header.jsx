import React, { useState, useEffect } from "react";

import "./header.scss";
import LogoBlack from "../../assets/LogoBlack.png"; // Import the logo image
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth"; // Import authService
import Cookies from "js-cookie"; // Import Cookies
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // Import hamburger icon
// Import icons if needed for notification and avatar
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track mobile menu open/close

  // Function to check login status
  const checkLoginStatus = () => {
    const token = Cookies.get("authToken");
    console.log("Current authToken:", token); // Debug log
    setIsLoggedIn(!!token);
    console.log("Login status updated:", !!token); // Debug log
  };

  useEffect(() => {
    console.log("Header component mounted"); // Debug log
    // Check login status when component mounts
    checkLoginStatus();

    // Add event listener for storage changes and custom auth state changes
    const handleStorageChange = () => {
      console.log("Storage changed"); // Debug log
      checkLoginStatus();
    };

    const handleAuthStateChange = () => {
      console.log("Auth state changed"); // Debug log
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authStateChange", handleAuthStateChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChange", handleAuthStateChange);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <img src={LogoBlack} alt="Quit Smoking Logo" className="logo" />{" "}
      {/* Use the imported logo */}
      {/* Hamburger icon for mobile */}
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
          <p>Comunity</p>
        </Link>
        <Link to="achievements">
          <p>Achievements</p>
        </Link>
        <Link to="/progress">
          <p>Track Progress</p>
        </Link>
        <Link to="/status">
          <p>QuitSmokingPlan</p>
        </Link>
        <Link to="/coach">
          <p>Coach</p>
        </Link>
      </div>
      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        // If logged in, show avatar and notification
        <div className="logged-in-icons">
          <button className="notification-button">
            <IoMdNotificationsOutline className="icon" />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar">
            <FaRegUserCircle className="icon" />
          </div>
          <button onClick={handleLogout} className="logout-button">
            <FiLogOut className="icon" />
            <span>Đăng xuất</span>
          </button>
        </div>
      ) : (
        // If not logged in, show login and register buttons
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="register">Đăng ký</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
