import React from "react";

const SkeletonLoader = ({ width = "100%", height = "20px", borderRadius = "4px" }) => {
  return (
    <div
      className="animate-pulse bg-gray-300"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default SkeletonLoader;
