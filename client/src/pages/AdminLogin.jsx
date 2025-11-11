import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin({ setIsAdmin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log("Entered Email:", JSON.stringify(trimmedEmail));
    console.log("Entered Password:", JSON.stringify(trimmedPassword));

    setTimeout(() => {
      // ✅ Simple static login validation
      if (trimmedEmail === "admin@gmail.com" && trimmedPassword === "admin123") {
        alert("✅ Logged in successfully!");
        setIsAdmin(true); // 🔓 Unlock access to AdminDashboard
        navigate("/admin"); // Redirect to Admin Dashboard
      } else {
        alert(
          "❌ Invalid credentials.\n\nEntered:\nEmail: " +
            trimmedEmail +
            "\nPassword: " +
            trimmedPassword
        );
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/50">
        <h1 className="text-3xl font-semibold text-center text-sky-700 mb-6">
          🔐 Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              placeholder="admin@gmail.com"
              required
            />
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none pr-10"
              placeholder="admin123"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-sky-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium transition-all disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}