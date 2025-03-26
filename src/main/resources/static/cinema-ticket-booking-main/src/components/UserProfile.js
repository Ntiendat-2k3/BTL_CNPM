import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading, error } =
    useAuth0();

  useEffect(() => {
    if (error) {
      console.error("Auth Error:", error);
      if (error.error === "invalid_state") {
        // Xử lý riêng cho state error
        localStorage.removeItem("auth0.is.authenticated");
        window.location.reload();
      }
    }
  }, [error]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      {isAuthenticated ? (
        <>
          {user?.picture && (
            <img
              src={user.picture}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          )}
          <span className="text-white">Hi, {user?.name || "User"}</span>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-green-500 p-2 rounded-lg text-white hover:bg-green-600 transition-colors"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserProfile;
