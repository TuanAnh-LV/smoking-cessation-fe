import React, { useState } from "react";
import "./Register.scss";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthService } from "../../services/auth.service"; // chỉnh path nếu cần
import { message } from "antd";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      message.success("Passwords do not match!");
      return;
    }

    const formattedBirthDate = birthDate
      ? birthDate.toISOString().split("T")[0]
      : "";

    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        birth_date: formattedBirthDate,
        gender: form.gender,
      };

      const response = await AuthService.register(payload);
      console.log("Registration success:", response);
      message.success(
        "Registration successful! Please check your email to verify your account."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      message.error("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Create account</h1>
        <p>Welcome to Moca! Wishing you a happy and healthy day!</p>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            placeholder="your full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of birth</label>
          <div className="input-with-icon">
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              customInput={<input type="text" id="dob" />}
              toggleCalendarOnIconClick
              showIcon
              icon={
                <FaCalendarAlt className="icon" style={{ cursor: "pointer" }} />
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="input-with-icon">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="create password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {showPassword ? (
              <FaEyeSlash
                className="icon"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaEye
                className="icon"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Re-enter password *</label>
          <div className="input-with-icon">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            {showConfirmPassword ? (
              <FaEyeSlash
                className="icon"
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaEye
                className="icon"
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        <button className="register-button" onClick={handleRegister}>
          Sign up
        </button>

        <div className="login-with-google">
          <p>Sign in with</p>
          <FcGoogle className="google-icon-2" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
