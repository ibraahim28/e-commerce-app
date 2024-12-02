import React from "react";
import { useState } from "react";

const SearchBar = ({ searching }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    return (
      <div
        className={`absolute top-full right-20 w-1/5 bg-white p-4 shadow-md transform transition-all duration-300 ${
          searching ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black   "
          placeholder="Search..."
        />
      </div>
    );
  };
  
  export default SearchBar;