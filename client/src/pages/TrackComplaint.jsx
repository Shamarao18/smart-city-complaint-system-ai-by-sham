import React, { useState } from "react";
import axios from "axios";

export default function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!complaintId.trim()) {
      setError("Please enter a valid Complaint ID (e.g., CMP1234)");
      return;
    }

    setError("");
    setLoading(true);
    setComplaint(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/complaint/${complaintId.trim()}`);
      setComplaint(res.data);
    } catch (err) {
      setError("Complaint not found. Please check your Complaint ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100 px-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-lg border border-white/50">
        <h1 className="text-3xl font-semibold text-center text-sky-700 mb-6">
          🔍 Track Your Complaint
        </h1>

        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            placeholder="Enter your Complaint ID (e.g., CMP4725)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium transition-all disabled:opacity-70"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {complaint && (
          <div className="mt-6 bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-sky-700 mb-2">
              Complaint Details
            </h2>
            <p><strong>Complaint ID:</strong> {complaint.complaintCode}</p>
            <p><strong>Name:</strong> {complaint.name}</p>
            <p><strong>City:</strong> {complaint.city}</p>
            <p><strong>State:</strong> {complaint.state}</p>
            <p><strong>Address:</strong> {complaint.address}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  complaint.status === "Resolved"
                    ? "text-green-600"
                    : complaint.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                {complaint.status}
              </span>
            </p>

            {complaint.image && (
              <div className="mt-3">
                <strong>Image:</strong>
                <img
                  src={`http://localhost:5000/uploads/${complaint.image}`}
                  alt="Complaint"
                  className="w-full mt-2 rounded-lg border"
                />
              </div>
            )}

            <p className="mt-3 text-gray-500 text-sm">
              Submitted on: {new Date(complaint.date).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}