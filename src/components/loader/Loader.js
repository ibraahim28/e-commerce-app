import React from "react";
import './loader.css'


const SkeletonLoader = ({ width = "100%", height = "20px", borderRadius = "8px" }) => {
  return (
    <div
      className="skeleton-loader mb-3"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default SkeletonLoader;
