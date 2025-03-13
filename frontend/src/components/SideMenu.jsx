import React from "react";

const SideMenu = ({ setCategory }) => {
  const handleCategoryChange = (category) => {
    setCategory(category); 
  };

  return (
    <div className="px-4 h-max sticky top-8">
  
      <h1 className="mb-4 text-md text-black font-bold">Search</h1>


      <h1 className="mt-8 mb-3 text-md text-black font-bold">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
    
      </div>

      {/* Categories */}
      <h1 className="mt-8 mb-4 text-md text-black font-bold">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("")}
        >
          All
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("Untold Stories")}
        >
          Untold Stories
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("Tactics")}
        >
          Tactics
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("Game Reads")}
        >
          Game Reads
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("Legendary Matches")}
        >
          Legendary Matches
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("Rising Stars")}
        >
          Rising Stars
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
