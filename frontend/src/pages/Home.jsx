import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import FeaturedPosts from "../components/FeautredPost";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <Link className=" text-customBlue font-medium" to="/">
          Home
        </Link>
        <span>&gt;</span>

        <Link to="/posts">
          <span className="text-customBlue font-medium">Blogs and Stories</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-customBlue text-3xl md:text-5xl lg:text-6xl font-extrabold">
            KickOff: Where Football Stories Come to Life!
          </h1>
          <p className="mt-8 font-gray-900 text-md md:text-xl">
            Share your love for the beautiful game — write, read, and relive
            unforgettable football moments. From matchday thrillers to personal
            journeys, KickOff is your space to tell the story of football, one
            goal at a time.
          </p>
        </div>

        <Link to="/write" className="hidden md:block relative">
          <button className="w-48 h-12  bg-customBlue text-white font-bold rounded-3xl shadow-md flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-105">
            <span className="mr-2">Write Your Story</span>


            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      <Categories category={""} />
      <FeaturedPosts />

      <div className="mt-5">
        <div className="border-t-2 border-customBlue "></div>
        <h1 className="my-8 py-2 text-3xl lg:text-5xl text-customBlue font-bold">
          Recent Posts
        </h1>
        <PostList />
      </div>
    </div>
  );
};

export default Home;
