import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("All");
  const [updating, setUpdating] = useState(null);

  // 🎯 Fetch all complaints from MongoDB via backend
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
      setFilteredComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔍 Department Filter
  const handleDeptFilter = (dept) => {
    setSelectedDept(dept);
    if (dept === "All") setFilteredComplaints(complaints);
    else setFilteredComplaints(complaints.filter((c) => c.department === dept));
  };

  // 🟢 Update Complaint Status
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdating(id);
      await axios.put(`http://localhost:5000/api/complaints/${id}`, {
        status: newStatus,
      });
      await fetchComplaints();
    } catch (err) {
      console.error("Error updating status:", err.message);
    } finally {
      setUpdating(null);
    }
  };

  // 📊 Count by Status
  const pendingCount = filteredComplaints.filter((c) => c.status === "Pending").length;
  const progressCount = filteredComplaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = filteredComplaints.filter((c) => c.status === "Resolved").length;

  // 🧩 Department Data for Pie Chart
  const departmentCounts = complaints.reduce((acc, c) => {
    const dep = c.department || "Uncategorized";
    acc[dep] = (acc[dep] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(departmentCounts).map((key) => ({
    name: key,
    value: departmentCounts[key],
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100 p-8 flex flex-col items-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 p-8 w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-semibold text-sky-700 text-center md:text-left">
            🧾 Admin Dashboard
          </h1>

          {/* Filter & Refresh */}
          <div className="flex items-center gap-3">
            <select
              value={selectedDept}
              onChange={(e) => handleDeptFilter(e.target.value)}
              className="border border-sky-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 text-gray-700 outline-none"
            >
              <option value="All">All Departments</option>
              {Object.keys(departmentCounts).map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>

            <button
              onClick={fetchComplaints}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-60 text-sky-600">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p>Loading complaints...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-center text-gray-500">
            No complaints found for selected department.
          </p>
        ) : (
          <>
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-sky-100">
                <h3 className="text-lg font-medium text-gray-600">
                  Pending Complaints
                </h3>
                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  {pendingCount}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-sky-100">
                <h3 className="text-lg font-medium text-gray-600">
                  In Progress
                </h3>
                <p className="text-3xl font-bold text-blue-500 mt-2">
                  {progressCount}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-sky-100">
                <h3 className="text-lg font-medium text-gray-600">Resolved</h3>
                <p className="text-3xl font-bold text-green-500 mt-2">
                  {resolvedCount}
                </p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-center mb-4 text-sky-700">
                Department-wise Complaints
              </h2>
              <div className="h-80">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Complaints Table */}
            <div className="mt-10 overflow-x-auto">
              <h2 className="text-xl font-semibold text-center mb-4 text-sky-700">
                Complaints ({selectedDept})
              </h2>
              <table className="w-full border-collapse bg-white/80 shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-sky-100 text-sky-800 text-left">
                    <th className="p-3">Code</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b hover:bg-sky-50 transition-all"
                    >
                      <td className="p-3 font-medium">{c.complaintCode}</td>
                      <td className="p-3">{c.name}</td>
                      <td className="p-3">{c.department || "N/A"}</td>
                      <td
                        className={`p-3 font-semibold ${
                          c.status === "Resolved"
                            ? "text-green-600"
                            : c.status === "Pending"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {c.status}
                      </td>
                      <td className="p-3">
                        {updating === c._id ? (
                          <Loader2 className="animate-spin text-sky-500" size={20} />
                        ) : (
                          <div className="flex gap-2">
                            {c.status === "Pending" && (
                              <button
                                onClick={() => updateStatus(c._id, "In Progress")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                              >
                                Mark In Progress
                              </button>
                            )}
                            {c.status === "In Progress" && (
                              <button
                                onClick={() => updateStatus(c._id, "Resolved")}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                              >
                                Mark Resolved
                              </button>
                            )}
                            {c.status === "Resolved" && (
                              <button
                                onClick={() => updateStatus(c._id, "Pending")}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                              >
                                Reopen
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        {new Date(c.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}