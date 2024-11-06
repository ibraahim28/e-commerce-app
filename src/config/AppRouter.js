import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromChildren,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";

const AppRouter = () => {


  const [isCartOpen, setIsCartOpen] = useState(false)
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}>
        <Route path="" element={<Home isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} toggleCart={toggleCart}  />} />
        <Route path="products/:productId" element={<ProductPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
