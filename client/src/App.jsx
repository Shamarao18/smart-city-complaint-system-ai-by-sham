import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ComplaintForm from "./pages/ComplaintForm";
import TrackComplaint from "./pages/TrackComplaint";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  // 🧠 Keep track of admin login state
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/track" element={<TrackComplaint />} />

          {/* Admin Login Page — pass setIsAdmin prop */}
          <Route path="/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />

          {/* Protected Admin Dashboard */}
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;