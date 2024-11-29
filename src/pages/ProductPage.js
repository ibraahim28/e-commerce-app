import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addProductToCart, getProductsFromCart } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { updateCounter } from "../redux/reducer";

const ProductPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProducts, setGetProducts] = useState(getProductsFromCart() ?? []);
  const [isAddedInCart, setIsAddedInCart] = useState(false);

  useEffect(() => {
    setIsAddedInCart(getProducts.includes(state?.id));
  }, [getProducts,state?.id]);

  const goBack = () => {
    navigate(-1);
  };

  const handleCart = () => {
    let getCartData = getProducts;

    if (getCartData.find((v) => Number(v) === Number(state.id))) {
      const filteredProducts = getCartData.filter((v) => v !== state.id);
      addProductToCart(filteredProducts);
      setGetProducts(filteredProducts);
      setIsAddedInCart(false);
      dispatch(updateCounter("decrease"));
    } else {
      getCartData.push(Number(state.id));
      addProductToCart(getCartData);
      setGetProducts(getCartData);
      setIsAddedInCart(true);
      dispatch(updateCounter("increase"));
    }
  };

  return (
    <div className="min-h-screen bg-primary-beige flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-xl w-full max-w-4xl flex flex-col md:flex-row gap-10 shadow-md">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            className="w-full h-auto max-w-sm rounded-lg"
            src={state?.image}
            alt={state?.title}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <p className="text-md font-medium text-primary uppercase tracking-wide">
              {state?.category}
            </p>
            <h1 className="text-2xl font-bold text-text-primary leading-tight">
              {state?.title}
            </h1>
            <p className="text-lg font-semibold text-primary mt-2">
              {state?.price} PKR
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed">{state?.description}</p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-auto">
            <button
              onClick={handleCart}
              className={`py-3 rounded-lg font-medium text-white transition-all active:scale-95 ${
                isAddedInCart
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-primary hover:bg-green-700"
              }`}
            >
              {isAddedInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button
              onClick={goBack}
              className="py-3 bg-text-primary text-white hover:bg-gray-900 font-medium rounded-lg transition-all active:scale-95"
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
