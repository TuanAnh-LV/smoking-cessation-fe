import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss'; // Import the SCSS file
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Assuming react-icons is installed
import { FcGoogle } from "react-icons/fc"; // Assuming react-icons is installed
import authService from '../../services/auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('preventDefault called');
        console.log('handleSubmit started'); // Log 1
        setError('');
        setLoading(true);

        try {
            console.log('Calling authService.login'); // Log 2
            await authService.login(formData.email, formData.password);
            console.log('authService.login finished successfully'); // Log 3
            console.log('Login successful, attempting to navigate...');
            // Dispatch custom event to notify about login status change
            window.dispatchEvent(new Event('authStateChange'));
            navigate('/'); // Chuyển hướng về trang chủ sau khi đăng nhập thành công
        } catch (error) {
            console.error('Login error caught in handleSubmit:', error); // Log 4
            setError(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            console.log('handleSubmit finished'); // Log 5
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="main-title">Welcome back!</h1>
                <p className="subtitle">Welcome to Moca!
 
 Wishing you a happy and healthy day!</p>

                {error && <div className="error-message">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Vui lòng điền mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                    </div>

                    <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Sign In'}
                    </button>

                    <div className="social-login-divider">
                        <span>Sign In with</span>
                    </div>

                    <button type="button" className="google-login-button">
                        <FcGoogle className="google-icon" />
                    </button>

                    <p className="signup-link">Don't have an account? <Link to="/register">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;