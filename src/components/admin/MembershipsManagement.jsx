import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  CreditCard,
} from "lucide-react";

const mockMemberships = [
  {
    id: 1,
    name: "Basic Plan",
    price: 9.99,
    duration: "monthly",
    features: ["Basic support", "Progress tracking", "Community access"],
    status: "active",
    userCount: 150,
  },
  {
    id: 2,
    name: "Premium Plan",
    price: 19.99,
    duration: "monthly",
    features: [
      "Priority support",
      "Advanced tracking",
      "Coach access",
      "Custom plans",
    ],
    status: "active",
    userCount: 85,
  },
  {
    id: 3,
    name: "Annual Basic",
    price: 99.99,
    duration: "yearly",
    features: [
      "Basic support",
      "Progress tracking",
      "Community access",
      "2 months free",
    ],
    status: "active",
    userCount: 45,
  },
];

export default function MembershipsManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMemberships = mockMemberships.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Memberships Management</h1>
          <p className="text-gray-500 mt-1">
            Manage subscription plans and pricing
          </p>
        </div>
        <button className="flex items-center gap-1 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Create Plan
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">All Membership Plans</h2>
            <p className="text-sm text-gray-500">
              A list of all subscription plans in your system
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search plans..."
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
              <th className="p-2 text-left">Plan Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Duration</th>
              <th className="p-2 text-left">Features</th>
              <th className="p-2 text-left">Users</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="p-2 flex gap-2 items-center">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  {m.name}
                </td>
                <td className="p-2 font-mono">${m.price}</td>
                <td className="p-2">
                  <span className="border rounded px-2 py-0.5 text-xs">
                    {m.duration}
                  </span>
                </td>
                <td className="p-2 text-gray-500 truncate max-w-[200px]">
                  {m.features.join(", ")}
                </td>
                <td className="p-2">{m.userCount} users</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      m.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="p-2 text-right">
                  <div className="inline-flex gap-1">
                    <button className="border rounded px-1 hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="border rounded px-1 hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="border rounded px-1 text-red-600 hover:bg-gray-100">
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
