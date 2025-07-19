import {
  Users,
  UserCheck,
  Award,
  CreditCard,
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarConfig = {
  admin: [
    { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { title: "Users", path: "/admin/users", icon: Users },
    { title: "Memberships", path: "/admin/memberships", icon: CreditCard },
    { title: "Coaches", path: "/admin/coaches", icon: UserCheck },
    { title: "Badges", path: "/admin/badges", icon: Award },
    { title: "Quit Plans", path: "/admin/quit-plans", icon: ClipboardList },
    { title: "Transactions", path: "/admin/transactions", icon: DollarSign },
  ],
  coach: [
    { title: "Dashboard", path: "/coach", icon: LayoutDashboard },
    { title: "Chat Message", path: "/coach/chat", icon: Users },
    { title: "Quit Plans", path: "/coach/quitplan-coach", icon: ClipboardList },
    { title: "Settings", path: "/coach/settings", icon: Settings },
  ],
};

export function DashboardSidebar({
  role = "admin",
  userName = "User",
  userEmail = "user@example.com",
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = sidebarConfig[role] || [];

  const handleNavigation = (path) => navigate(path);
  const handleLogout = () => {};

  return (
    <div className="flex flex-col min-h-screen w-64 border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {role[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-lg capitalize">{role} Panel</h2>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Navigation
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                location.pathname.startsWith(item.path)
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {userName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium border border-gray-300 rounded px-3 py-1.5 w-full hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
