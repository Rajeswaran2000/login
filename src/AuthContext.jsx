import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange } from './firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user
  };

  // Enhanced loading screen with better styling
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700 mb-2">Loading...</div>
          <div className="text-sm text-gray-500">Initializing authentication</div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </div>
    </AuthContext.Provider>
  );
};
