import {
  Users,
  UserCheck,
  Award,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    colorClass: "text-blue-600 bg-blue-100",
  },
  {
    title: "Active Memberships",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    colorClass: "text-green-600 bg-green-100",
  },
  {
    title: "Active Coaches",
    value: "45",
    change: "+2.1%",
    trend: "up",
    icon: UserCheck,
    colorClass: "text-purple-600 bg-purple-100",
  },
  {
    title: "Badges Awarded",
    value: "3,521",
    change: "-1.2%",
    trend: "down",
    icon: Award,
    colorClass: "text-orange-600 bg-orange-100",
  },
];

// const recentActivities = [
//   {
//     id: 1,
//     message: "New user registration: john.doe@email.com",
//     time: "2 minutes ago",
//     status: "success",
//   },
//   {
//     id: 2,
//     message: "Premium membership purchased by Sarah Wilson",
//     time: "15 minutes ago",
//     status: "success",
//   },
//   {
//     id: 3,
//     message: "Coach invitation sent to mike.trainer@email.com",
//     time: "1 hour ago",
//     status: "pending",
//   },
// ];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center border rounded px-3 py-1 text-sm hover:bg-gray-100">
            <Eye className="h-4 w-4 mr-2" /> View Reports
          </button>
          <button className="flex items-center border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-sm bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" /> Quick Action
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.title} className="p-8 bg-white rounded shadow">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium ">{stat.title}</span>
              <div className={`p-2 rounded ${stat.colorClass}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-sm mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span
                className={
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }
              >
                {stat.change}
              </span>
              <span className="ml-1 text-gray-400">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Recent Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Latest system activities and updates
          </p>
          <div className="space-y-4 mt-4">
            {[
              {
                message: "New user registration: john.doe@email.com",
                time: "2 minutes ago",
                status: "success",
                dot: "bg-green-500",
              },
              {
                message: "Premium membership purchased by Sarah Wilson",
                time: "15 minutes ago",
                status: "success",
                dot: "bg-green-500",
              },
              {
                message: "Coach invitation sent to mike.trainer@email.com",
                time: "1 hour ago",
                status: "pending",
                dot: "bg-yellow-500",
              },
              {
                message: "30-day streak badge awarded to 12 users",
                time: "2 hours ago",
                status: "info",
                dot: "bg-blue-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex gap-2">
                  <span
                    className={`w-2 h-2 rounded-full mt-2 ${item.dot}`}
                  ></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === "success"
                      ? "bg-gray-900 text-white"
                      : item.status === "pending"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm mb-4">Common administrative tasks</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="border rounded p-2 flex flex-col items-center hover:bg-gray-50">
              <Users className="h-7 w-7 mb-1" />
              <span className="text-xs">Add User</span>
            </button>
            <button className="border rounded p-2 flex flex-col items-center hover:bg-gray-50">
              <UserCheck className="h-7 w-7 mb-1" />
              <span className="text-xs">Invite Coach</span>
            </button>
            <button className="border rounded p-2 flex flex-col items-center hover:bg-gray-50">
              <Award className="h-7 w-7 mb-1" />
              <span className="text-xs">Create Badge</span>
            </button>
            <button className="border rounded p-2 flex flex-col items-center hover:bg-gray-50">
              <CreditCard className="h-7 w-7 mb-1" />
              <span className="text-xs">New Membership</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
