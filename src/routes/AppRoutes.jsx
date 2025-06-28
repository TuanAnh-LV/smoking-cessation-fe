import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/Login";
import RegisterPage from "../pages/RegisterPage/Register";
import StatusPage from "../pages/StatusPage/StatusPage";
import QuitPlan from "../pages/QuitPlan/QuitPlan";
import ProgressPage from "../pages/ProgressPage/ProgressPage";
import AchievementPage from "../pages/AchievementPage/AchievementPage";
import CommunityPage from "../pages/CommunityPage/CommunityPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import PaymentSuccess from "../pages/PaymentPage/PaymentSuccess";
import Coach from "../pages/CoachPage/CoachPage";
import CoachPage from "../pages/CoachPage/CoachPage";
import ProfileCoach from "../pages/ProfileCoach/ProfileCoach";
// import thêm các page khác nếu có

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />{" "}
      {/* Đảm bảo route trang chủ tồn tại */}
      {/* Các routes khác */}
      <Route path="/status" element={<StatusPage />} />
      <Route path="/quit-plan" element={<QuitPlan />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/achievements" element={<AchievementPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="/coach" element={<CoachPage/>} />
      <Route path="/profile-coach" element={<ProfileCoach/>} />
    </Routes>
  );
};

export default AppRoutes;
