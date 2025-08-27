import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { logoutUser, onAuthStateChange } from "./firebase";

const UserManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
      navigate('/');
    } else {
      console.error('Logout failed:', result.error);
    }
    setLoading(false);
  };

  const goToHome = () => {
    navigate('/');
  };

  // If no user is logged in, redirect to login
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">Please sign in to access User Management</p>
          <button
            onClick={goToHome}
            className="px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg transition-all duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header with user info and logout */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.email[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-lg">User Management Dashboard</p>
                <p className="text-gray-300 text-sm">Logged in as {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={goToHome}
                className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg transition-all duration-200"
              >
                Back to Home
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Content */}
      <Provider store={store}>
        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-white mb-4">
                👥 User Management Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Add, view, and manage users seamlessly with{" "}
                <span className="font-semibold text-indigo-400">Redux</span>.
              </p>
            </div>

            {/* User Form */}
            <div className="mb-8">
              <UserForm />
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-8"></div>

            {/* User List */}
            <div>
              <UserList />
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default UserManagement;
