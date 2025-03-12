import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { postService } from "../services/postService";

const FeaturedPosts = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
       
        const response = await postService.getAllPosts(); // Fetch posts
        if (response.length > 4) {
          const shuffled = [...response].sort(() => 0.5 - Math.random());
          setFeatured(shuffled.slice(0, 4)); // Select 4 random posts
        } else {
          setFeatured(response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (featured.length < 1) return null;

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* Left big post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 shadow-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        {/* image */}
        {featured[0].imageUrl && (
          <Link to={`/${featured[0]._id}`} className="block">
            <img
              src={featured[0].imageUrl}
              alt={featured[0].title}
              className=" object-contains  rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md"
              width="895"
              
            />
          </Link>
        )}
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">{featured[0].category}</Link>
          <span className="text-gray-500">{moment(featured[0].createdAt).fromNow()}</span>
        </div>
        {/* title */}
        <Link
          to={`/${featured[0]._id}`}
          className="text-xl text-gray-900 lg:text-3xl font-semibold lg:font-bold  hover:text-blue-600 transition-colors"
        >
          {featured[0].title}
        </Link>
      </div>

      {/* Right Side - Small Posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {featured.slice(1).map((post, index) => (
          <div key={post._id} className="lg:h-1/3 flex justify-between gap-4">
            {/* Small Image */}
            {post.imageUrl && (
              <div className="w-1/3 aspect-video">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="rounded-3xl object-center w-full h-full"
                  width="298"
                />
              </div>
            )}
            {/* Post Info */}
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">0{index + 2}.</h1>
                <Link className="text-blue-800">{post.category}</Link>
                <span className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</span>
              </div>
              <Link
                to={`/${post._id}`}
                className="text-base text-gray-900 sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-bold  hover:text-blue-600 transition-colors  "
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
