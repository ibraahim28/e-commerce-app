import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../utils/data/data";
import SkeletonLoader from "../components/loader/Loader";
import { updateLoader } from "../redux/reducer";

const CardLayout = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState(["All Products"]);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [productSearched, setProductSearched] = useState([]);
  const { isLoading } = useSelector((v) => v.counter);
  const { searchTerm } = useSelector((v) => v.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    const allCategories = [
      "All Products",
      ...new Set(products.map((product) => product.category)),
    ];
    setFilterCategory(allCategories);
  }, [products]);
  
  useEffect(() => {
    const getData = async () => {
      dispatch(updateLoader(true));  
      const API_DATA = await fetchData();
      if (API_DATA) {
        setProducts(API_DATA);  
        dispatch(updateLoader(false));  
      } else {
        console.log("Error fetching data");
        dispatch(updateLoader(false));
      }
    };
    getData();
  }, [dispatch]);
  
  useEffect(() => {
    let filteredProducts = products || [];  // Ensure products is not undefined
  
    // Filter by search term
    if (searchTerm.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filter by active category
    if (activeCategory !== "All Products") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === activeCategory
      );
    }
  
    setProductSearched(filteredProducts);
  }, [searchTerm, activeCategory, products]);  // Dependencies include all relevant states
  

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
                  <option key={category} className="mb-2 border-b-2 font-semibold capitalize">
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="flex w-screen gap-5 py-5 items-center flex-wrap">
        {!isLoading
          ? productSearched?.length > 0
            ? productSearched.map((item) => <Card key={item.id} data={item} />)
            : activeCategory === "All Products"
            ? products.map((item) => <Card key={item.id} data={item} />)
            : products
                .filter((product) => product.category === activeCategory)
                .map((product) => <Card key={product.id} data={product} />)
          : Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex gap-3 flex-col w-[20%]">
                  <SkeletonLoader height="250px" />
                  <SkeletonLoader width="80%" height="20px" className="mt-3" />
                  <SkeletonLoader width="60%" height="15px" className="mt-2" />
                </div>
              ))}
      </div>
    </div>
  );
};

export default CardLayout;
