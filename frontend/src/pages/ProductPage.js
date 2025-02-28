import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addProductToCart, getProductsFromCart } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { updateCounter } from "../redux/reducer";
import { BASE_URL } from "../api/config";

const ProductPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProducts, setGetProducts] = useState(getProductsFromCart() ?? []);
  const [isAddedInCart, setIsAddedInCart] = useState(false);

  useEffect(() => {
    setIsAddedInCart(getProducts.some((productId) => productId === state?._id));
  }, [getProducts, state?._id]);

  const goBack = () => {
    navigate(-1);
  };

  const handleCart = () => {
    const getCartData = getProducts; // Clone the cart to avoid mutating state directly

    console.log("getCartData before update", getCartData)
    if (getCartData.includes(state?._id)) {
      // Remove product from cart
      const filteredProducts = getCartData.filter((v) => v !== state._id);
      console.log("filteredProducts", filteredProducts)
      addProductToCart(filteredProducts); // Save the updated cart to local storage
      setGetProducts(filteredProducts); // Update local state
      setIsAddedInCart(false); // Update button state
      dispatch(updateCounter("decrease")); // Decrease counter
    } else {
      // Add product to cart
      getCartData.push(state._id);
      addProductToCart(getCartData); // Save the updated cart to local storage
      setGetProducts(getCartData); // Update local state
      setIsAddedInCart(true); // Update button state
      dispatch(updateCounter("increase")); // Increase counter
    }
    console.log("getCartData after update", getCartData)
  };

  return (
    <div className="min-h-screen bg-soft-beige flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-xl w-full max-w-4xl flex flex-col md:flex-row gap-10 shadow-lg transition-transform duration-300 hover:scale-105">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img
            className="w-full h-auto max-w-sm rounded-lg transform transition-transform duration-500 hover:scale-110"
            src={`${BASE_URL}${state?.images[0]?.url}`}
            alt={state?.images[0]?.altText}
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <p className="text-md font-medium text-fresh-green uppercase tracking-widest mb-2">
              {state?.category}
            </p>
            <h1 className="text-3xl font-semibold text-dark-charcoal leading-tight mb-4">
              {state?.name}
            </h1>
            <p className="text-lg font-semibold text-primary mt-2">
              {state?.price} PKR
            </p>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {state?.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-auto">
            <button
              onClick={handleCart}
              className={`py-3 rounded-lg font-medium text-white transition-all transform duration-300 active:scale-95 ${
                isAddedInCart
                  ? "bg-tomato-red hover:bg-red-700"
                  : "bg-fresh-green hover:bg-green-700"
              }`}
            >
              {isAddedInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button
              onClick={goBack}
              className="py-3 bg-dark-charcoal text-white hover:bg-gray-800 font-medium rounded-lg transition-all transform duration-300 active:scale-95"
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
