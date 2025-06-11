import { lazy } from "react";
import { ROUTER_URL } from "../const/router.const";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./protected/protectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/Login"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/Register"));
const StatusPage = lazy(() => import("../pages/StatusPage/StatusPage"));
const QuitPlan = lazy(() => import("../pages/QuitPlan/QuitPlan"));
const ProgressPage = lazy(() => import("../pages/ProgressPage/ProgressPage"));
const AchievementPage = lazy(() =>
  import("../pages/AchievementPage/AchievementPage")
);
const CommunityPage = lazy(() =>
  import("../pages/CommunityPage/CommunityPage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const CoachPage = lazy(() => import("../pages/CoachPage/CoachPage"));
const ProfileCoach = lazy(() => import("../pages/ProfileCoach/ProfileCoach"));

const routes = [
  // Public routes
  {
    element: <MainLayout />,
    children: [
      { path: ROUTER_URL.COMMON.HOME, element: <HomePage /> },
      { path: ROUTER_URL.COMMON.LOGIN, element: <LoginPage /> },
      { path: ROUTER_URL.COMMON.REGISTER, element: <RegisterPage /> },
      { path: ROUTER_URL.COMMON.STATUS, element: <StatusPage /> },
      { path: ROUTER_URL.COMMON.TRACKPROGRESS, element: <ProgressPage /> },
      { path: ROUTER_URL.COMMON.QUITPLAN, element: <QuitPlan /> },
      { path: ROUTER_URL.COMMON.COMMUNITY, element: <CommunityPage /> },
      { path: ROUTER_URL.COMMON.COACH, element: <CoachPage /> },
      { path: ROUTER_URL.COMMON.ACHIEVEMENTS, element: <AchievementPage /> },
      { path: ROUTER_URL.COMMON.PROFILE, element: <ProfilePage /> },
      { path: ROUTER_URL.COMMON.PROFILE_COACH, element: <ProfileCoach /> },
      { path: ROUTER_URL.COMMON.PAYMENT, element: <PaymentPage /> },
    ],
  },

  // Admin route with DashboardLayout

  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    // children: [{ path: "", element: <AdminDashboard /> }],
  },

  // Seller route with DashboardLayout
  {
    path: "/coach",
    element: (
      <ProtectedRoute allowedRoles={["coach"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    // children: [{ path: "dashboard", element: <SellerDashboard /> }],
  },

  {
    path: "/member",
    element: (
      <ProtectedRoute allowedRoles={["member"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
    // children: [{ path: "dashboard", element: <BuyerDashboard /> }],
  },

  {
    path: "/unauthorize",
    element: (
      <div className="text-center text-red-500 text-xl mt-20">
        403 – Không có quyền truy cập
      </div>
    ),
  },
];

export default routes;
