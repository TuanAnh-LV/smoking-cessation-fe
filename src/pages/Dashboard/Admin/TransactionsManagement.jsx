import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
  DollarSign,
  Download,
} from "lucide-react";

const mockTransactions = [
  {
    id: "TXN001",
    userId: "USR123",
    userName: "John Doe",
    amount: 29.99,
    type: "Membership",
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "2024-06-20",
    description: "Premium Membership - Monthly",
  },
  {
    id: "TXN002",
    userId: "USR124",
    userName: "Jane Smith",
    amount: 9.99,
    type: "Coaching",
    status: "Completed",
    paymentMethod: "PayPal",
    date: "2024-06-19",
    description: "Personal Coaching Session",
  },
  {
    id: "TXN003",
    userId: "USR125",
    userName: "Mike Johnson",
    amount: 99.99,
    type: "Membership",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    date: "2024-06-18",
    description: "Premium Membership - Annual",
  },
  {
    id: "TXN004",
    userId: "USR126",
    userName: "Sarah Wilson",
    amount: 19.99,
    type: "Coaching",
    status: "Failed",
    paymentMethod: "Credit Card",
    date: "2024-06-17",
    description: "Group Coaching Session",
  },
  {
    id: "TXN005",
    userId: "USR127",
    userName: "David Brown",
    amount: 49.99,
    type: "Membership",
    status: "Refunded",
    paymentMethod: "Credit Card",
    date: "2024-06-16",
    description: "Premium Membership - Quarterly",
  },
];

export default function TransactionsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Membership":
        return "bg-purple-100 text-purple-800";
      case "Coaching":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transactions Management</h1>
          <p className="text-gray-500">
            Monitor and manage all financial transactions
          </p>
        </div>
        <button className="flex items-center bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700">
          <Download className="h-4 w-4 mr-1" /> Export Data
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Total Revenue</span>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">$209.95</div>
          <p className="text-xs text-gray-500">+15% from last month</p>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Completed</span>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-gray-500">Successful transactions</p>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Pending</span>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">1</div>
          <p className="text-xs text-gray-500">Awaiting confirmation</p>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Failed/Refunded</span>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-gray-500">Issues requiring attention</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">All Transactions</h2>
            <p className="text-sm text-gray-500">
              A complete list of all financial transactions
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search transactions..."
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
              <th className="p-2 text-left">Transaction ID</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Payment Method</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((txn) => (
              <tr key={txn.id} className="border-b">
                <td className="p-2 font-medium">{txn.id}</td>
                <td className="p-2">
                  <div className="font-medium">{txn.userName}</div>
                  <div className="text-xs text-gray-500">{txn.userId}</div>
                </td>
                <td className="p-2 font-medium">
                  {formatCurrency(txn.amount)}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${getTypeColor(
                      txn.type
                    )}`}
                  >
                    {txn.type}
                  </span>
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${getStatusColor(
                      txn.status
                    )}`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="p-2">{txn.paymentMethod}</td>
                <td className="p-2">{formatDate(txn.date)}</td>
                <td className="p-2 text-right">
                  <div className="inline-flex gap-1">
                    <button className="border rounded px-1 hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="border rounded px-1 hover:bg-gray-100">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center gap-1">
            <button
              className={`border rounded px-2 py-1 text-sm ${
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`border rounded px-2 py-1 text-sm ${
                  currentPage === i + 1 ? "bg-blue-100" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`border rounded px-2 py-1 text-sm ${
                currentPage === totalPages
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
