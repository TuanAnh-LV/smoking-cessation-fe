import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
} from "lucide-react";

const mockQuitPlans = [
  {
    id: 1,
    name: "7-Day Quick Start",
    description: "A beginner-friendly plan to quit smoking in 7 days",
    duration: "7 days",
    difficulty: "Beginner",
    totalSteps: 7,
    status: "Active",
  },
  {
    id: 2,
    name: "30-Day Complete",
    description: "Comprehensive 30-day program with daily goals",
    duration: "30 days",
    difficulty: "Intermediate",
    totalSteps: 30,
    status: "Active",
  },
  {
    id: 3,
    name: "90-Day Master",
    description: "Advanced program for long-term success",
    duration: "90 days",
    difficulty: "Advanced",
    totalSteps: 90,
    status: "Draft",
  },
];

export default function QuitPlansManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = mockQuitPlans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quit Plans Management</h1>
          <p className="text-gray-500">
            Manage smoking cessation programs and plans
          </p>
        </div>
        <button className="flex items-center bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-1" /> Create Plan
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">All Quit Plans</h2>
            <p className="text-sm text-gray-500">
              A list of all smoking cessation plans
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
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Duration</th>
              <th className="p-2 text-left">Difficulty</th>
              <th className="p-2 text-left">Steps</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="border-b">
                <td className="p-2 font-medium">{plan.name}</td>
                <td className="p-2 text-gray-500 truncate max-w-xs">
                  {plan.description}
                </td>
                <td className="p-2">{plan.duration}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${getDifficultyColor(
                      plan.difficulty
                    )}`}
                  >
                    {plan.difficulty}
                  </span>
                </td>
                <td className="p-2">{plan.totalSteps} steps</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${getStatusColor(
                      plan.status
                    )}`}
                  >
                    {plan.status}
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
