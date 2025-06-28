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
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useAuth();
  const isLoggedIn = !!token;
  const [planId, setPlanId] = useState(localStorage.getItem("currentPlanId"));
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handler = () => setPlanId(localStorage.getItem("currentPlanId"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="header">
      <img src={LogoBlack} alt="Quit Smoking Logo" className="logo" />

      {/* Hamburger menu icon for mobile */}
      <div
        className="hamburger-menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <HiOutlineMenuAlt3 className="icon" />
      </div>

      {/* Navigation links */}
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
        <Link to="/blog">
          <p>Blogs</p>
        </Link>
      </div>

      {/* User section */}
      {isLoggedIn ? (
        <div className="logged-in-icons" ref={profileRef}>
          <button className="notification-button">
            <IoMdNotificationsOutline className="icon" />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar relative">
            <FaRegUserCircle
              className="icon cursor-pointer"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            />
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Profile
                </Link>
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
