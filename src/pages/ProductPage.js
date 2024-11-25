import React, { useEffect, useState } from "react";
import image from "../img/her-fruits.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { addProductToCart, getProductsFromCart } from "../utils/localStorage";

const ProductPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [getProducts, setGetProducts] = useState(getProductsFromCart() ?? []);
  const [isAddedInCart, setIsAddedInCart] = useState(false);

  useEffect(() => {
    setIsAddedInCart(getProducts.includes(state?.id));
  });

  const goBack = () => {
    navigate(-1);
  };

  const handleCart = () => {
    let getCartData = getProducts;
    console.log(getCartData);

    if (getCartData.find((v) => Number(v) === Number(state.id))) {
      const filteredProducts = getCartData.filter((v) => v !== state.id);
      addProductToCart(filteredProducts);
      setGetProducts(filteredProducts);
      setIsAddedInCart(false);
    } else {
      getCartData.push(Number(state.id));
      addProductToCart(getCartData);
      setGetProducts(getCartData);
      setIsAddedInCart(true);
    }
  };

  return (
    <div className="my-20">
      <div className=" bg-gray-100 px-5 py-10 rounded-md w-1/2 mx-auto flex gap-20 items-center ">
        <div>
          <div>
            <img className="w-96 aspect-video object-fit" src={image} />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="">
            <p className="mb-3 text-lg font-medium hover:text-primary text-text-primary transition-all duration-200">
              {state?.category}
            </p>
            <h1 className="mb-2 text-2xl font-semibold hover:text-primary text-text-primary transition-all duration-150">
              {state?.title}
            </h1>
            <p className="font-bold hover:text-primary transition-all duration-150">
              {state?.price}-PKR{" "}
            </p>
            <p className="text-base my-4">{state?.description}</p>
          </div>
          <div className=" flex flex-col gap-3 justify-center w-full">
            <button
              onClick={handleCart}
              className="bg-text-primary w-full py-2 text-white hover:bg-primary font-medium rounded-md"
            >
              {isAddedInCart ? "Remove from Cart" : " Add to Cart"}
            </button>
            <button
              onClick={goBack}
              className="bg-text-primary w-full py-2 text-white hover:bg-primary font-medium rounded-md"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
