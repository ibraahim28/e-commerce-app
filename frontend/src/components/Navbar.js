import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaUser, FaTimes, FaSearch, FaBars } from "react-icons/fa";
import logo from "../img/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getUserData, getUserRole } from "../utils/auth/auth";
import { BASE_URL } from "../api/config";

const Navbar = ({ toggleCart }) => {
  const { counter } = useSelector((state) => state);
  const [searching, setSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => setSearching((prev) => !prev);
  const navigateToRegister = () => navigate("/register");
  const navigateToProfile = () => navigate("/profile");
  const navigateToDashboard = () => navigate('/admin/dashboard')
  const user = getUserData();
  console.log(user)
  const userRole = getUserRole();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="relative">
      <header className="bg-dark-charcoal text-white flex items-center justify-between px-6 sm:px-10 py-4 sm:py-6 shadow-lg">
        {/* Logo */}
        <div onClick={() => { navigate('/') }} className="cursor-pointer">
          <img src={logo} alt="Logo" className="h-8 sm:h-10 cursor-pointer" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-6 text-sm sm:text-md font-semibold">
            {["Home", "Pages", "Shop", "Coupons", "Blogs", "Contact"].map((item) => (
              <li key={item} className="cursor-pointer hover:text-fresh-green transition-all">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative cursor-pointer flex items-center justify-center">
            <div onClick={toggleCart} className="text-white hover:text-fresh-green transition-all">
              <FaShoppingCart />
            </div>
            <div className="absolute -top-5 -right-1 bg-fresh-green w-5 h-5 rounded-full flex items-center justify-center text-xs text-gray-200">
              {counter.count}
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            {/* Heart */}
            <button className="text-white hover:text-fresh-green transition-all">
              <FaHeart />
            </button>
            {/* Search */}
            <div className="flex items-center">
              {searching && <SearchBar searching={searching} />}
              <button
                onClick={handleSearch}
                className="text-white hover:text-fresh-green transition-all"
              >
                <FaSearch />
              </button>
            </div>
            {/* User Profile/Login */}
            <div
              onClick={user ? userRole === 'user' ? navigateToProfile : navigateToDashboard : navigateToRegister}
              className="flex flex-col items-center text-sm text-white hover:text-fresh-green">
              {user && user.profilePicture ? (
                <img
                  src={`${BASE_URL}${user.profilePicture}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              ) : (
                <FaUser className="text-white" />
              )}
              <button
                className="transition-all"

              >
                {user ? user.username : "Login"}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute bg-dark-charcoal text-white w-full p-6 z-50 shadow-lg top-full left-0 md:hidden">
          <ul className="flex flex-col gap-6 text-sm">
            {["Home", "Pages", "Shop", "Coupons", "Blogs", "Contact"].map((item) => (
              <li key={item} className="cursor-pointer hover:text-fresh-green transition-all">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
