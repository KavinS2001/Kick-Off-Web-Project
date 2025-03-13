import { useState, useEffect } from "react";
import { postService } from "../services/postService";
import { Link } from "react-router-dom";
import PostList from "../components/PostList";

const TrendingPosts = () => {
  const [trending, setTrending] = useState([]);

  return (
    <div className="mt-2">
 
      <div className="border-t-2 border-customBlue mb-8"></div>
      <h1 className="mb-8 text-customBlue font-extrabold text-4xl md:text-4xl lg:text-5xl">
        Trending Posts
      </h1>

  
      <div className="flex flex-col gap-8">
        <PostList trending={true} /> 
      </div>

    </div>
  );
};

export default TrendingPosts;
