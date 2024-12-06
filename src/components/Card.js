import React from "react";

import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const navigateToProduct = (data) => {
    console.log("data",data);
    navigate(`products/${data.id}`, { state: data });
  };

  return (
    <div
      className="flex w-1/5 gap-3 flex-col border rounded-lg cursor-pointer shadow-md shadow-gray-300"
     
    >
      <div className="w-full p-4">
        <img
          className="w-full cursor-pointer aspect-square hover:scale-110 transition-all duration-300"
          src={data.image}
          alt="fruits"
        />
      </div>
      <div className="flex flex-col gap-5 text-left p-5">
        <p className="cursor-pointer hover:text-primary transition-all duration-200">
          {data.category}
        </p>
        <h1 className="text-2xl cursor-pointer hover:text-primary transition-all duration-200 line-clamp-1">
          {data.title}
        </h1>
        <p className="text-lg">{data.price}-PKR</p>
      </div>
      <div className="py-4 mx-auto">
        <button
        onClick={()=>{navigateToProduct(data)}}
          className="hover:bg-primary hover:text-white border-2 border-primary px-10 py-2 transition-all duration-200 rounded-full font-lg font-medium"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default Card;
