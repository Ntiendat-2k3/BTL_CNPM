import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth();
  const [formToShow, setFormToShow] = useState(null); 

  // Tự động đóng form khi đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      setFormToShow(null);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const handleClose = () => {
    setFormToShow(null);
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <span className="text-white">Hi, {user.username}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setFormToShow('login')}
            className="bg-green-500 p-2 rounded-lg text-white hover:bg-green-600 transition-colors"
          >
            Login
          </button>

          {formToShow === 'login' && (
            <LoginForm
              onClose={handleClose}
              onLoginSuccess={handleClose}
              onSwitchToSignup={() => setFormToShow('signup')}
            />
          )}

          {formToShow === 'signup' && (
            <SignupForm
              onClose={handleClose}
              onSwitchToLogin={() => setFormToShow('login')}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;