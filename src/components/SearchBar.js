import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchTerm } from "../redux/reducer";

const SearchBar = ({ searching }) => {
  const { searchTerm } = useSelector((v) => v.counter);
  console.log("searchTerm==>>", searchTerm);

  const dispatch = useDispatch();

const handleChange = (e) => {
  dispatch(updateSearchTerm(e.target.value))
}


  return (
    <div
      className={`absolute top-full right-20 w-1/5 bg-white p-4 shadow-md transform transition-all duration-300 ${
        searching ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e)=>{handleChange(e)}}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black   "
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
