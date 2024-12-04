import React, { useState } from "react";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import logo from "../img/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleCart }) => {
  const { counter } = useSelector((s) => s);
  const [searching, setSearching] = useState(false);


  const handleSearch = () => {
    if (searching) setSearching(false);
    else setSearching(true);
  };

  return (
  <div className="relative">
    
    <header className="bg-primary text-white flex items-center justify-between px-10 py-8">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div>
        <ul className="flex gap-6 text-md font-semibold  ">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Pages</li>
          <li className="cursor-pointer">Shop</li>
          <li className="cursor-pointer">Coupons</li>
          <li className="cursor-pointer">Blogs</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </div>
      <div className="flex items-center text-xl gap-4">
        <div className="flex flex-col gap-4 cursor-pointer items-center">
          <div onClick={toggleCart} className="relative">
            <FaCartShopping />
          </div>
          <div className="bg-text-primary w-5 h-5 absolute top-4 rounded-full text-sm text-gray-200 flex items-center justify-center ">
            <p>{counter.count}</p>
          </div>
        </div>
        <div className="w-full flex items-center gap-4">
          <button>
            <FaHeart />
          </button>
          <div className="w-full">
            {searching ? <SearchBar searching={searching} /> : ""}
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <button>Login</button>
            <button>
              <FaUser />
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
  );
};

export default Navbar;


