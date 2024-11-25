import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { BASE_URL } from "../api/config";

const CardLayout = ({ data }) => {
  const [showData, setShowData] = useState([]);

  const handleClick = (text) => {
    setShowData(
      data.filter((item) => item.category.toLowerCase() === text.toLowerCase())
    );
  };

  useEffect(() => {
    fetch(BASE_URL, {
      method: "GET",
    })
      .then((res) => {
        res.json().then((response) => {
          setShowData(response);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="mx-20">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 text-left py-10 text-3xl font-bold text-text-primary">
          <span className="font-light text-base text-primary">
            All Product Shop
          </span>
          <h3 className="text-3xl font-bold text-text-primary">
            {/* {showData.length > 8 ? "All Products" : showData[0].category} */}
          </h3>
        </div>
        <div className="mx-10 w-1/3 line ">
          <div className="flex flex-wrap gap-2 justify-center items-center text-xl">
            <button
              className="px-2 text-gray-500 hover:text-black "
              onClick={(e) => {
                handleClick(e.target.innerText);
              }}
            >
              Vegetables
            </button>
            <button
              className="px-2 text-gray-500 hover:text-black "
              onClick={(e) => {
                handleClick(e.target.innerText);
              }}
            >
              Dairy & Eggs
            </button>
            <button
              className="px-2 text-gray-500 hover:text-black "
              onClick={(e) => {
                handleClick(e.target.innerText);
              }}
            >
              Meat
            </button>
            <button
              className="px-2 text-gray-500 hover:text-black "
              onClick={(e) => {
                handleClick(e.target.innerText);
              }}
            >
              Fruits
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-screen gap-5 py-5 items-center flex-wrap">
        {showData.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CardLayout;
