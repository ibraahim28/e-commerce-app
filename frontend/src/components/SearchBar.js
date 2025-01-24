import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchTerm } from "../redux/reducer";

const SearchBar = () => {
  const { searchTerm } = useSelector((v) => v.counter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  return (
    <div
      className="absolute top-full left-0 right-0 bg-white p-4 shadow-md z-50 sm:left-auto sm:right-10 sm:w-64 md:w-80 lg:w-96"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
