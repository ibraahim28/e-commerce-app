import React, { useState } from "react";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import logo from "../img/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { getUserData } from "../utils/auth/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleCart }) => {
  const { counter } = useSelector((s) => s);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searching) setSearching(false);
    else setSearching(true);
  };

  const user = getUserData();

  const navigateToRegister = () => {
    navigate('/register')
  }
  

  return (
    <div className="relative">
      <header className="bg-dark-charcoal text-white flex items-center justify-between px-10 py-8 shadow-lg">
        <div>
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <div>
          <ul className="flex gap-6 text-md font-semibold">
            <li className="cursor-pointer hover:text-fresh-green transition-all">
              Home
            </li>
            <li className="cursor-pointer hover:text-fresh-green transition-all">
              Pages
            </li>
            <li className="cursor-pointer hover:text-fresh-green transition-all">
              Shop
            </li>
            <li className="cursor-pointer hover:text-fresh-green transition-all">
              Coupons
            </li>
            <li className="cursor-pointer hover:text-fresh-green transition-all">
              Blogs
            </li>
            <li className="cursor-pointer hover:text-fresh-green transition-all">
              Contact
            </li>
          </ul>
        </div>
        <div className="flex items-center text-xl gap-4">
          <div className="flex flex-col gap-4 cursor-pointer items-center relative">
            <div
              onClick={toggleCart}
              className="relative text-white hover:text-fresh-green transition-all"
            >
              <FaCartShopping />
            </div>
            <div className="bg-text-primary w-5 h-5 absolute top-4 right-0 rounded-full text-sm text-gray-200 flex items-center justify-center">
              <p>{counter.count}</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <button className="text-white hover:text-fresh-green transition-all">
              <FaHeart />
            </button>
            <div className="w-full">
              {searching ? <SearchBar searching={searching} /> : ""}
              <button
                onClick={handleSearch}
                className="text-white hover:text-fresh-green transition-all"
              >
                <FaSearch />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              {user ? (
                <div className="flex flex-col items-center hover:text-fresh-green">
                  <button className="transition-all">
                    <FaUser />
                  </button>

                  <p className="text-sm cursor-pointer transition-all">{user.username}</p>
                </div>
              ) : (
                <button onClick={navigateToRegister} className="text-white hover:text-fresh-green transition-all">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
