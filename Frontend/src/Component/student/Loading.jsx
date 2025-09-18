import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Loading text with animation */}
        <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-sm">Please wait while we prepare things for you</p>
      </div>
    </div>
  );
};

export default Loading;
