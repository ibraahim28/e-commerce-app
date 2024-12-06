import React from "react";
import HeroSection from "../components/HeroSection";
import CardLayout from "../Layouts/CardLayout";
import Cart from "../components/Cart";

const Home = ({ isCartOpen, setIsCartOpen, toggleCart }) => {


  return (
    <>
      <HeroSection />
      <CardLayout  />
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
      />
    </>
  );
};

export default Home;
