import React from "react";
import Masonry from "react-masonry-css";

const MasonryLayout = ({ children }) => {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    // 700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-4"
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
