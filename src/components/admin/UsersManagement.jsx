import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  UserCheck,
  Award,
  CreditCard,
  Users,
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    status: "active",
    membership: "Premium",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    status: "active",
    membership: "Basic",
    joinDate: "2024-02-20",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    status: "inactive",
    membership: "Premium",
    joinDate: "2024-01-08",
    avatar: "/placeholder.svg",
  },
];

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-gray-500 mt-1">
            Manage user accounts and their information
          </p>
        </div>
        <button className="flex items-center gap-1 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add User
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">All Users</h2>
            <p className="text-sm text-gray-500">
              A list of all users in your system
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded pl-8 pr-2 py-1 text-sm"
              />
            </div>
            <button className="flex items-center border rounded px-2 py-1 text-sm hover:bg-gray-100">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </button>
          </div>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Membership</th>
              <th className="p-2 text-left">Join Date</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="p-2 text-gray-500">{user.email}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2">
                  <span className="border rounded px-2 py-0.5 text-xs">
                    {user.membership}
                  </span>
                </td>
                <td className="p-2 text-gray-500">{user.joinDate}</td>
                <td className="p-2 text-right">
                  <div className="inline-flex gap-1">
                    <button className="border rounded px-1 py-0.5 hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="border rounded px-1 py-0.5 hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="border rounded px-1 py-0.5 text-red-600 hover:bg-gray-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
