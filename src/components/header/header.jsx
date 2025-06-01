import React, { useState, useEffect } from 'react'

import './header.scss'
import LogoBlack from '../../assets/LogoBlack.png'; // Import the logo image
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth'; // Import authService
import Cookies from 'js-cookie'; // Import Cookies
// Import icons if needed for notification and avatar
// import { IoMdNotificationsOutline } from "react-icons/io"; 
// import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Function to check login status
  const checkLoginStatus = () => {
    const token = Cookies.get('authToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Check login status when component mounts
    checkLoginStatus();

    // Add event listener for storage changes
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='header'>
      <img src={LogoBlack} alt="Quit Smoking Logo" className="logo"/> {/* Use the imported logo */}

      <div className='nav-links'>
        <Link to='/'><p>Home</p></Link>
        <Link to='/blog'><p>Blog</p></Link>
        <Link to='/package'><p>Member ship Package</p></Link>
        <Link to='achievements'><p>Achievements</p></Link>
      </div>

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        // If logged in, show avatar and notification
        <div className='logged-in-icons'>
          {/* Placeholder for Notification Button */}
          <button className='notification-button'>Notification</button> {/* Replace with icon like <IoMdNotificationsOutline /> */}
          {/* Placeholder for User Avatar */}
          <div className='user-avatar'>Avatar</div> {/* Replace with img or component like <FaRegUserCircle /> */}
          <button onClick={handleLogout} className='logout-button'>Đăng xuất</button>
        </div>
      ) : (
        // If not logged in, show login and register buttons
        <div className='auth-buttons'>
          <Link to='/login'>
            <button className='login'>Đăng nhập</button>
          </Link>
          <Link to='/register'>
            <button className='register'>Đăng ký</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
