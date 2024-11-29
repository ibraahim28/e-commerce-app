import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { fetchData } from "../utils/data/data";

const CardLayout = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState(["All Products"]);
  const [activeCategory, setActiveCategory] = useState("All Products");

  useEffect(() => {
    const getData = async () => {
      const API_DATA = await fetchData();
      if (API_DATA) {
        setProducts(API_DATA);
      } else {
        console.log("Error fetching data");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const allCategories = [
      "All Products",
      ...new Set(products.map((product) => product.category)),
    ];
    setFilterCategory(allCategories);
  }, [products]);

  return (
    <div className="mx-20">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 text-left py-10 text-3xl font-bold text-text-primary">
          <span className="font-light text-base text-primary">
            All Product Shop
          </span>
          <h3 className="text-3xl font-bold text-text-primary capitalize">
            {activeCategory}
          </h3>
        </div>
        <div className="mx-10 w-1/3 line ">
          <div className="flex flex-wrap gap-2 justify-center items-center text-xl">
            <select
              onChange={(e) => {
                setActiveCategory(e.target.value);
              }}
              className=" border-2 border-gray-800 capitalize px-2 py-1"
            >
              {filterCategory.map((category) => {
                return (
                  <option  className="mb-2 border-b-2 font-semibold capitalize">
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="flex w-screen gap-5 py-5 items-center flex-wrap">
        {activeCategory === "All Products"
          ? products.map((item, index) => <Card key={index} data={item} />)
          : products.map((product, index) => {
              return product.category === activeCategory ? (
                <Card key={index} data={product} />
              ) : (
                ""
              );
            })}
      </div>
    </div>
  );
};

export default CardLayout;
