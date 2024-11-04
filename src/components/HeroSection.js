import React from "react";
import subtitle from "../img/subtitle-hero.webp";
import fruits from "../img/her-fruits.webp";

const HeroSection = () => {
  return (
    <div className="hero-wrapper bg-gray-100 pl-24 py-24">
      <div className="flex items-center w-screen justify-between max-w-screen-xl">
        <div className="flex flex-col">
          <div>
            <img src={subtitle} alt="Subtitles" />
          </div>
          <div className="flex flex-col items-baseline gap-10">
            <h1 className="text-7xl font-bold text-left text-text-primary">The Online<br/> Grocery Store</h1>
            <button className="bg-primary px-10 text-white font-semibold rounded-full py-3">Shop Now</button>
          </div>
        </div>
        <div>
          <img className="w-[600px]" src={fruits} alt="fruits" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
