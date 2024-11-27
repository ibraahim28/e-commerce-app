import React from "react";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import logo from "../img/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = ({ toggleCart }) => {
  const { counter } = useSelector((s) => s);
  console.log("counter", counter);
  return (
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
        <div className="flex gap-4 cursor-pointer items-center">
        <p>{counter}</p>
          <div onClick={toggleCart}>
          <FaCartShopping />
          </div>
          <button>
            <FaHeart />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button>
            <FaSearch />
          </button>
          <div className="flex gap-2 items-center">
            <button>Login</button>
            <button>
              <FaUser />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
