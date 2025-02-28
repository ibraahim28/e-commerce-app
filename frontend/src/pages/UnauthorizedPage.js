
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold text-red-500">403 - Unauthorized</h2>
      <p className="mt-4">You do not have permission to access this page.</p>
    </div>
  );
};

export default UnauthorizedPage;
