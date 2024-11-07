import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Card from "../components/Card";
import CardLayout from "../Layouts/CardLayout";
import Cart from "../components/Cart";
import groceryItems from "../data/data";

const Home = ({ isCartOpen, setIsCartOpen, toggleCart }) => {


  return (
    <>
      <HeroSection />
      <CardLayout data={groceryItems} />
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
      />
    </>
  );
};

export default Home;
