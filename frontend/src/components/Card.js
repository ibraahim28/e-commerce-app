import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const navigateToProduct = (data) => {
    console.log("data", data);
    navigate(`products/${data.id}`, { state: data });
  };

  return (
    <div
      className="flex w-1/5 gap-3 flex-col border rounded-lg cursor-pointer shadow-lg shadow-gray-300 hover:shadow-fresh-green transition-all duration-300"
    >
      <div className="w-full p-4">
        <img
          className="w-full cursor-pointer aspect-square hover:scale-105 transition-all duration-300 rounded-lg"
          src={data.image}
          alt={data.title}
        />
      </div>
      <div className="flex flex-col gap-5 text-left p-5">
        <p className="cursor-pointer text-dark-charcoal hover:text-fresh-green transition-all duration-200">
          {data.category}
        </p>
        <h1 className="text-2xl cursor-pointer text-dark-charcoal hover:text-fresh-green transition-all duration-200 line-clamp-1">
          {data.title}
        </h1>
        <p className="text-lg font-semibold text-tomato-red">{data.price}-PKR</p>
      </div>
      <div className="py-4 mx-auto">
        <button
          onClick={() => { navigateToProduct(data) }}
          className="hover:bg-fresh-green hover:text-white border-2 border-fresh-green px-10 py-2 transition-all duration-200 rounded-full font-medium text-dark-charcoal"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default Card;
