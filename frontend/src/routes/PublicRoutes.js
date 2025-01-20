import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ element, isAuthenticated, redirectTo = "/" }) => {
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : element;
};

PublicRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool,
  redirectTo: PropTypes.string,
};

export default PublicRoute;
