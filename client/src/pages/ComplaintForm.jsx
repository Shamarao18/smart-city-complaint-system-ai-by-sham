import React, { useState } from "react";
import axios from "axios";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Auto-trigger AI prediction for address text
    if (name === "address") {
      handleAIPredict(value);
    }
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🧠 Function to call Flask AI for department prediction
  const handleAIPredict = async (text) => {
    if (!text || text.length < 5) {
      setAiPrediction(null);
      return;
    }
    try {
      setLoadingAI(true);
      const res = await axios.post("http://127.0.0.1:5001/predict", { text });
      if (res.data.success) {
        setAiPrediction({
          department: res.data.category,
          confidence: res.data.confidence,
        });
      } else {
        setAiPrediction(null);
      }
    } catch (err) {
      console.error("AI Prediction Error:", err.message);
      setAiPrediction(null);
    } finally {
      setLoadingAI(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const res = await axios.post("http://localhost:5000/api/complaint", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { complaintCode, department, confidence } = res.data;

      alert(
        `✅ Complaint Submitted Successfully!\n\n` +
        `🧾 Complaint ID: ${complaintCode}\n` +
        `🏢 Department: ${department}\n` +
        `🤖 AI Confidence: ${confidence}%`
      );

      // Reset form
      setForm({
        name: "",
        city: "",
        state: "",
        address: "",
        image: null,
      });
      setAiPrediction(null);
    } catch (err) {
      console.error("Error submitting complaint:", err.message);
      alert("❌ Failed to submit complaint. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100 flex justify-center items-center p-6">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/50">
        <h1 className="text-3xl font-semibold text-center text-sky-700 mb-6">
          📝 Submit a Complaint
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />

          <textarea
            name="address"
            placeholder="Describe the issue..."
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            rows="4"
            required
          ></textarea>

          {/* 🧠 AI Department Preview */}
          {loadingAI ? (
            <div className="text-center text-sky-600 font-medium animate-pulse">
              🔍 Analyzing issue with AI...
            </div>
          ) : aiPrediction ? (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg text-center">
              <p className="text-sky-700 font-semibold">
                🧠 Predicted Department:{" "}
                <span className="text-sky-800">{aiPrediction.department}</span>
              </p>
              <p className="text-gray-600">
                Confidence: {aiPrediction.confidence}%
              </p>
            </div>
          ) : null}

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image (optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium transition-all disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}