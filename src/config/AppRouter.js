import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import CheckoutPage from "../pages/CheckoutPage";
import { getProductsFromCart } from "../utils/localStorage";
import { updateCounter } from "../redux/reducer";
import { useDispatch } from "react-redux";

const AppRouter = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(()=>{
    const cartProducts = getProductsFromCart();

    console.log(cartProducts)

    dispatch(updateCounter(cartProducts.length))

  },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        }
      >
        <Route
          path=""
          element={
            <Home
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              toggleCart={toggleCart}
            />
          }
        />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
