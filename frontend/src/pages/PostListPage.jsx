import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";
import Categories from "../components/Categories";


const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(""); 

  const location = useLocation();
  const queryCategory = new URLSearchParams(location.search).get("cat");
  //console.log(queryCategory);

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory); 
    }
    else{
      setCategory(""); 
    }
  }, [queryCategory]);

  return (
    <div className="mt-2">
      <Categories category={category} />
       <div className="border-t-2 border-customBlue mb-8 "></div> 
      <h1 className="mb-8 text-customBlue font-extrabold text-4xl md:text-4xl lg:text-5xl">
        {category === "" ? "All Posts" : category}
      </h1>
      <button
        onClick={() => setOpen((p) => !p)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div>
          
          <PostList category={category} trending={false} />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu setCategory={setCategory}  />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
