import React from "react";
import subtitle from "../img/subtitle-hero.webp";
import fruits from "../img/her-fruits.webp";

const HeroSection = () => {
  return (
    <div className="hero-wrapper bg-gray-100 py-24 px-8 md:px-16 lg:px-24">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Left Section: Text and Button */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="flex justify-start items-center">
            <img src={subtitle} alt="Subtitles" className="max-w-xs lg:max-w-md" />
          </div>
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary leading-tight">
              The Online<br /> Grocery Store
            </h1>
            <button className="bg-fresh-green px-12 py-4 text-white text-sm md:text-lg font-semibold rounded-full transition-all transform hover:scale-105 hover:bg-transparent hover: border-4 border-fresh-green hover:text-fresh-green ">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="lg:w-1/2">
          <img
            className="w-full max-w-md lg:max-w-lg transition-all transform hover:scale-105"
            src={fruits}
            alt="Fruits"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
