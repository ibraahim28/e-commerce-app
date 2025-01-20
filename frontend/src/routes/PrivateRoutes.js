// src/routes/PrivateRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ element, isAuthenticated, redirectTo = "/login" }) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
