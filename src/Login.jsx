import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  logoutUser,
  onAuthStateChange,
} from "./firebase";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginUser(email, password);

    if (result.success) {
      setUser(result.user);
      setEmail("");
      setPassword("");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
    } else {
      console.error('Logout failed:', result.error);
    }
    setLoading(false);
  };

  const goToUserManagement = () => {
    navigate('/user-management');
  };

  // ✅ If logged in, show welcome message with navigation
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
        <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">
              {user.email[0].toUpperCase()}
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mb-4">Welcome Back! 🎉</h2>
          <p className="text-gray-300 mb-2">Successfully signed in as</p>
          <p className="text-indigo-300 font-semibold mb-6">{user.email}</p>
          
          <div className="space-y-4">
            <button
              onClick={goToUserManagement}
              className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              🚀 Go to User Management
            </button>
            
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Login Form UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
          <p className="text-gray-300 mt-2">Access your account securely</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 pt-5 pb-2 bg-white/20 text-white rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:outline-none peer"
              placeholder=" "
              required
            />
            <label className="absolute left-4 top-2.5 text-gray-300 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-indigo-300">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 pt-5 pb-2 bg-white/20 text-white rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:outline-none peer"
              placeholder=" "
              required
            />
            <label className="absolute left-4 top-2.5 text-gray-300 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-indigo-300">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
