import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="hidden md:flex bg-neutral-300 rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-2">
      {/* links */}
      <div className="flex flex-1 items-center justify-start gap-4 flex-wrap">
        <Link
          to="/posts"
          className="bg-customBlue text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=Untold Stories"
          className="hover:bg-customBlue  hover:text-white rounded-full px-4 py-2 border-2 border-customBlue hover:border-white"
        >
          Untold Stories
        </Link>
        <Link
          to="/posts?cat=Tactics"
          className="hover:bg-customBlue  hover:text-white  rounded-full px-4 py-2 border-2 border-customBlue hover:border-white"
        >
          Tactics
        </Link>
        <Link
          to="/posts?cat=Game Reads"
          className="hover:bg-customBlue  hover:text-white  rounded-full px-4 py-2 border-2 border-customBlue hover:border-white"
        >
          Game Reads
        </Link>
        <Link
          to="/posts?cat=Legendery Matches "
          className="hover:bg-customBlue  hover:text-white  rounded-full px-4 py-2 border-2 border-customBlue hover:border-white"
        >
         Legendery Matches 
        </Link>
        <Link
          to="/posts?cat=Rising Stars"
          className="hover:bg-customBlue hover:text-white  rounded-full px-4 py-2 border-2 border-customBlue hover:border-white"
        >
          Rising Stars
        </Link>
      </div>
      <span className="text-3xl font-bold">|</span>
      <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="black"
        >
          <circle cx="10.5" cy="10.5" r="7.5" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

export default Categories;
