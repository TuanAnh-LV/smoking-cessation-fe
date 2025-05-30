import React from 'react'

import './header.scss'
import LogoBlack from '../../assets/LogoBlack.png'; // Import the logo image
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <img src={LogoBlack} alt="Quit Smoking Logo" className="logo"/> {/* Use the imported logo */}

      <div className='nav-links'>
        <p>Home</p>
        <p>Blog</p>
        <p>Member ship Package</p>
        <p>Achievements</p>
      </div>

      <div className='auth-buttons'>
        <Link to='/login'>
        <button className='login'>Đăng nhập</button></Link>
        <button className='register'>Đăng ký</button>
        
      </div>
    </div>
  )
}

export default Header
