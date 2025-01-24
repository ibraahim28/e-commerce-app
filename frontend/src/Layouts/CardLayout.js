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
    let filteredProducts = products || []; // Ensure products is not undefined

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
  }, [searchTerm, activeCategory, products]); // Dependencies include all relevant states

  return (
    <div className="max-w-full px-4 md:px-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-3 py-10 text-3xl font-bold text-text-primary text-center md:text-left">
          <span className="font-light text-base text-primary">
            All Product Shop
          </span>
          <h3 className="text-3xl font-bold text-text-primary capitalize">
            {activeCategory}
          </h3>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex justify-center md:justify-end">
            <select
              onChange={(e) => setActiveCategory(e.target.value)}
              className="border-2 border-gray-800 px-4 py-2 w-full md:w-3/4 capitalize"
            >
              {filterCategory.map((category) => (
                <option
                  key={category}
                  className="mb-2 border-b-2 font-semibold capitalize"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 py-5">
        {!isLoading ? (
          productSearched?.length > 0 ? (
            productSearched.map((item) => (
              <Card key={item._id} data={item} />
            ))
          ) : (
            <div className="w-full text-xl font-semibold text-gray-600">
              No products found.
            </div>
          )
        ) : (
          Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex gap-3 flex-col w-full "
              >
                <SkeletonLoader height="250px" />
                <SkeletonLoader width height="20px" className="mt-3" />
                <SkeletonLoader width="60%" height="15px" className="mt-2" />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default CardLayout;
