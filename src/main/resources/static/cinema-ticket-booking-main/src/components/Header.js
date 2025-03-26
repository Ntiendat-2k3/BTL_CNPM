import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl">
        <Link
          to="/"
          className="text-3xl font-bold flex items-center hover:text-gray-300"
        >
          <span className="mr-2 text-yellow-400">C</span>
          <span>cine royale</span>
        </Link>

        <Navbar />

        {/* Search and User Info */}
        <div className="flex items-center space-x-6">
          <SearchBar />

          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
