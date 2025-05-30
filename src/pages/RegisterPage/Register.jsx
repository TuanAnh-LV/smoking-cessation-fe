import React from 'react';
import './Register.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [birthDate, setBirthDate] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Create account</h1>
        <p>Welcome to Moca!
Wishing you a happy and healthy day!</p>

        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input type="text" id="fullName" placeholder="your full name" />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of birth</label>
          <div className="input-with-icon">
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YY"
              customInput={<input type="text" id="dob" />}
              toggleCalendarOnIconClick
              showIcon
              icon={
                <FaCalendarAlt className="icon" style={{ cursor: 'pointer' }} />
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="your email" />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" placeholder="your phone number" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="input-with-icon">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="create password"
            />
            {showPassword ? (
              <FaEyeSlash className="icon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
            ) : (
              <FaEye className="icon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Re-enter password*</label>
          <div className="input-with-icon">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Re-enter password"
            />
            {showConfirmPassword ? (
              <FaEyeSlash className="icon" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }} />
            ) : (
              <FaEye className="icon" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }} />
            )}
          </div>
        </div>

        <button className="register-button">Sign up</button>

        <div className="login-with-google">
          <p>Sign in with</p>
          {/* Google icon placeholder */}
          <FcGoogle className="google-icon-2"/>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
