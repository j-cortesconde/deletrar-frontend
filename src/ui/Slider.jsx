import React, { useState } from "react";

function Slider() {
  const [isCollections, setIsCollections] = useState(true);

  const handleToggle = () => {
    setIsCollections(!isCollections);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-16 w-64 rounded-full bg-gray-200 shadow-inner">
        <div
          className={`absolute top-0 flex h-16 w-1/2 transform cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition-all duration-300 ${
            isCollections ? "left-0" : "left-1/2"
          }`}
          onClick={handleToggle}
        >
          {isCollections ? "Collections" : "Texts"}
        </div>
        <div
          className={`absolute left-0 top-0 flex h-16 w-1/2 items-center justify-center rounded-full ${
            isCollections ? "text-blue-500" : "text-gray-500"
          } transition-all duration-300`}
        >
          Collections
        </div>
        <div
          className={`absolute left-1/2 top-0 flex h-16 w-1/2 items-center justify-center rounded-full ${
            isCollections ? "text-gray-500" : "text-blue-500"
          } transition-all duration-300`}
        >
          Texts
        </div>
      </div>
    </div>
  );
}

export default Slider;
