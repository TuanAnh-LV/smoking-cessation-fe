import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, Filter, Mail } from "lucide-react";

const mockCoaches = [
  {
    id: 1,
    name: "Dr. Emily Smith",
    email: "emily.smith@coaches.com",
    specialization: "Addiction Recovery",
    status: "active",
    experience: "5 years",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "John Martinez",
    email: "john.martinez@coaches.com",
    specialization: "Behavioral Therapy",
    status: "active",
    experience: "8 years",
    avatar: "/placeholder.svg",
  },
];

export default function CoachesManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoaches = mockCoaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Coaches Management</h1>
          <p className="text-gray-500">Manage coaches and their information</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center border rounded px-3 py-1 text-sm hover:bg-gray-100">
            <Mail className="h-4 w-4 mr-1" /> Invite Coach
          </button>
          <button className="flex items-center gap-1 bg-black text-white rounded h-[40px] px-3 py-1 cursor-pointer hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" /> Add Coach
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-7">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold leading-none tracking-tight">
              All Coaches
            </h2>
            <p className="text-sm text-gray-500">
              A list of all coaches in your system
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search coaches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded pl-10 h-[40px] w-[300px] pr-2 py-1 text-sm"
              />
            </div>
            <button className="flex items-center border rounded px-2 py-1 text-sm hover:bg-gray-100 h-[40px]">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </button>
          </div>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead className="border-b border-b-gray-200">
            <tr>
              <th className="p-2 text-left">Coach</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Specialization</th>
              <th className="p-2 text-left">Experience</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoaches.map((coach) => (
              <tr key={coach.id} className="border-b border-b-gray-200">
                <td className="p-5 flex items-center gap-2">
                  <img
                    src={coach.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{coach.name}</span>
                </td>
                <td className="p-2 text-gray-500">{coach.email}</td>
                <td className="p-2">{coach.specialization}</td>
                <td className="p-2">{coach.experience}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded-3xl text-xs ${
                      coach.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {coach.status}
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
