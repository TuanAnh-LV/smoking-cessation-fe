import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
  Award,
} from "lucide-react";

const mockBadges = [
  {
    id: 1,
    name: "First Week",
    description: "Complete your first week smoke-free",
    icon: "🏆",
    color: "#FFD700",
    criteria: "7 days smoke-free",
  },
  {
    id: 2,
    name: "First Month",
    description: "One month of smoke-free living",
    icon: "🎖️",
    color: "#C0C0C0",
    criteria: "30 days smoke-free",
  },
  {
    id: 3,
    name: "Milestone Master",
    description: "Achieved multiple milestones",
    icon: "⭐",
    color: "#CD7F32",
    criteria: "Complete 5 milestones",
  },
];

export default function BadgesManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBadges = mockBadges.filter(
    (badge) =>
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Badges Management</h1>
          <p className="text-gray-500">Manage achievement badges and rewards</p>
        </div>
        <button className="flex items-center gap-1 bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Create Badge
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">All Badges</h2>
            <p className="text-sm text-gray-500">
              A list of all achievement badges in your system
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search badges..."
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
              <th className="p-2 text-left">Badge</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Criteria</th>
              <th className="p-2 text-left">Color</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBadges.map((badge) => (
              <tr key={badge.id} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.icon}
                  </div>
                  {badge.name}
                </td>
                <td className="p-2 text-gray-500">{badge.description}</td>
                <td className="p-2">
                  <span className="border rounded px-2 py-0.5 text-xs">
                    {badge.criteria}
                  </span>
                </td>
                <td className="p-2 flex items-center gap-1">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: badge.color }}
                  ></div>
                  <span className="text-xs">{badge.color}</span>
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
