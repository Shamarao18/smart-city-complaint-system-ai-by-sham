import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">SmartCity Complaint Portal</h1>
        <p className="text-slate-600 mb-6">Report civic issues, track progress, and help make your city better — now with AI-assisted routing.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate("/complaint")} className="btn-accent px-6 py-3 rounded-lg shadow">Report an Issue</button>
          <button onClick={() => navigate("/track")} className="px-6 py-3 rounded-lg border border-slate-200 bg-white">Track Complaint</button>
        </div>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-left">
            <h3 className="text-xl font-semibold text-slate-800">AI Routing</h3>
            <p className="text-slate-600 text-sm mt-2">Automatically classify complaints and send them to the right department.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-slate-800">Real-time Tracking</h3>
            <p className="text-slate-600 text-sm mt-2">Users can track by complaint ID and view status updates.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-slate-800">Admin Dashboard</h3>
            <p className="text-slate-600 text-sm mt-2">Officers get analytics and can update statuses quickly.</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}