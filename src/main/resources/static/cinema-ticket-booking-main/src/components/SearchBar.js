import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert("Searching for: " + searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 rounded-lg text-black w-60 focus:outline-none"
      />
      <button type="submit" className="bg-yellow-500 p-2 rounded-lg text-white">
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
