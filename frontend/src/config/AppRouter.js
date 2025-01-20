// AppRouter.jsx
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import CheckoutPage from "../pages/CheckoutPage";
import { getProductsFromCart } from "../utils/localStorage";
import { updateCounter } from "../redux/reducer";
import { useDispatch } from "react-redux";
import AuthPage from "../pages/AuthPage";
import AdminAuthPage from "../pages/AdminAuthPage";
import AdminDashboard from "../pages/AdminDashboard";
import AddProduct from "../pages/AddProduct";
import FetchAllProducts from "../pages/FetchAllProducts";
import FetchOrders from "../pages/FetchOrders";
import FetchUsers from "../pages/FetchUsers";
import AdminLayout from "../Layouts/AdminLayout"; // Import AdminLayout

// Private Route for authentication
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/register" />;
  }

  return children;
};

// Admin-only Private Route
const AdminPrivateRoute = ({ children }) => {
  const userRole = localStorage.getItem("user_role");

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRouter = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const cartProducts = getProductsFromCart();
    dispatch(updateCounter(cartProducts.length));
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route
          path="/"
          element={<Layout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
        >
          <Route
            index
            element={<Home isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} toggleCart={toggleCart} />}
          />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/register" element={<AuthPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout /> {/* Admin layout wraps all admin pages */}
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="fetch-products" element={<FetchAllProducts />} />
          <Route path="fetch-orders" element={<FetchOrders />} />
          <Route path="fetch-users" element={<FetchUsers />} />
        </Route>

        {/* Admin login remains outside the AdminLayout */}
        <Route path="/admin/register" element={<AdminAuthPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
