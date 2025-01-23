import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaCartShopping, FaUser, FaBars,  } from "react-icons/fa6";
import logo from "../img/logo.svg";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { getUserData } from "../utils/auth/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleCart }) => {
  const { counter } = useSelector((state) => state);
  const [searching, setSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUserData();

  const handleSearch = () => setSearching((prev) => !prev);
  const navigateToRegister = () => navigate("/register");

  return (
    <div className="relative">
  <header className="bg-dark-charcoal text-white flex items-center justify-between px-4 md:px-10 py-6 shadow-lg">
    {/* Logo Section */}
    <div>
      <img onClick={() => {
        navigate('/')
      }
      } src={logo} alt="Logo" className="sm:h-10 h-8" />
    </div>

    {/* Main Navigation (Desktop) */}
    <div className="hidden md:flex gap-6 text-sm lg:text-md font-semibold">
      <ul className="flex gap-6">
        <li className="cursor-pointer hover:text-fresh-green transition-all">
          Home
        </li>
        <li className="cursor-pointer hover:text-fresh-green transition-all">
          Shop
        </li>
        <li className="cursor-pointer hover:text-fresh-green transition-all">
          Pages
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

    {/* Utility Section */}
    <div className="flex items-center text-xl gap-4 py-2 relative">
      {/* Cart */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={toggleCart}
      >
        <FaCartShopping className="hover:text-fresh-green transition-all" />

        <div className="absolute top-0 left-0 bg-tomato-red text-sm rounded-full w-4 h-4 flex items-center justify-center">
          {counter.count}
        </div>
      </div>

      {/* Search */}
      <div
        className={`relative ${
          searching ? "w-full max-w-sm absolute top-full mt-2 bg-dark-charcoal" : ""
        }`}
      >
        <button
          onClick={handleSearch}
          className="hover:text-fresh-green transition-all"
        >
          <FaSearch />
        </button>
        {searching && (
          <div className="absolute w-[80vw] max-w-lg left-1/2 transform -translate-x-1/2 sm:w-full">
            <SearchBar />
          </div>
        )}
      </div>

      {/* User Section */}
      <div>
        {user ? (
          <div className="flex flex-col items-center cursor-pointer hover:text-fresh-green transition-all">
            <FaUser />
            <p className="text-sm">{user.username}</p>
          </div>
        ) : (
          <button
            onClick={navigateToRegister}
            className="hover:text-fresh-green transition-all"
          >
            Login
          </button>
        )}
      </div>

    {/* Hamburger Menu (Mobile) */}
    <button
      className="md:hidden block text-white text-2xl"
      onClick={() => setMenuOpen((prev) => !prev)}
    >
      <FaBars />
    </button>
    </div>

  </header>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="absolute bg-dark-charcoal text-white w-full p-6 z-50 shadow-lg top-20 left-0 md:hidden">
      <ul className="flex flex-col gap-6 text-md">
        <li className="cursor-pointer hover:text-fresh-green transition-all">
          Home
        </li>
        <li className="cursor-pointer hover:text-fresh-green transition-all">
          Shop
        </li>
        <li className="cursor-pointer hover:text-fresh-green transition-all">
          Pages
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
  )}
</div>

  );
};

export default Navbar;
