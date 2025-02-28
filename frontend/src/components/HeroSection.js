// HeroSection.jsx - Ultra-modern layered design
import React from "react";
import subtitle from "../img/subtitle-hero.webp";
import fruits from "../img/her-fruits.webp";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-soft-beige/30 to-mint-green/10">
      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content with Floating Effect */}
          <div className="relative space-y-8 z-10">
            <div className="animate-float">
              <img src={subtitle} alt="Subtitles" className="max-w-[280px] lg:max-w-[380px]" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fresh-green to-dark-charcoal">
                Freshness
              </span>
              <br />
              <span className="text-dark-charcoal">Delivered to Your Door</span>
            </h1>
            
            <button className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-bold rounded-full bg-fresh-green text-white hover:bg-dark-charcoal transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-fresh-green/30">
              <span>Start Shopping</span>
              <svg className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>

          {/* Image with Parallax Effect Container */}
          <div className="relative lg:min-h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-fresh-green/10 rounded-[40px] transform rotate-6 scale-105"></div>
            <div className="absolute inset-0 bg-mint-green/10 rounded-[40px] transform -rotate-6 scale-105"></div>
            <img 
              src={fruits} 
              alt="Fruits" 
              className="relative z-10 w-full max-w-[500px] rounded-[32px] transform transition-transform duration-500 hover:scale-95" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;