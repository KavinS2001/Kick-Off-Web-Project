import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import Image from "./Image";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full  py-8 px-4 md:px-8 lg:px-16">
       <div className="border-t-2 border-customBlue mb-8 "></div> 
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-4 text-2xl font-bold"
          onClick={scrollToTop}
        >
          <Image
            src="LogoBig.png"
            className="rounded-xl"
            w={64}
            h={64}
            alt="KickOff."
          />
          <span className="font-extrabold text-3xl tracking-widest ">
            Kick
            <span className="font-extrabold text-customBlue">Off.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
          <Link to="/" className="hover:text-customBlue">
            Home
          </Link>
          <Link to="/trending" className="hover:text-customBlue">
            Trending
          </Link>
          <Link to="/top-stories" className="hover:text-customBlue">
            Top Stories
          </Link>
          <Link to="/about" className="hover:text-customBlue">
            About
          </Link>
        </div>
      </div>

      <div className="md:hidden mt-6 flex justify-center gap-6">
        <Link to="/" className="hover:text-customBlue">
          Home
        </Link>
        <Link to="/trending" className="hover:text-customBlue">
          Trending
        </Link>
        <Link to="/top-stories" className="hover:text-customBlue">
          Top Stories
        </Link>
        <Link to="/about" className="hover:text-customBlue">
          About
        </Link>
      </div>

      <div className="mt-6 flex justify-center gap-16 ">
        <a
          href="https://www.facebook.com/kickoff"
          target="_blank"
          rel="noopener noreferrer"
          className="text-customBlue hover:text-black "
        >
          <FaFacebookF size={32} />
        </a>
        <a
          href="https://github.com/KavinS2001/Kick-Off-Web-Project.git"
          target="_blank"
          rel="noopener noreferrer"
          className="text-customBlue hover:text-black "
        >
          <FaGithub size={32} />
        </a>
      </div>


      <div className="mt-10 flex justify-center ">
        <button
          onClick={scrollToTop}
          className="bg-customBlue py-2  text-white font-bold  px-6 rounded-full hover:bg-blue-800 transition"
        >
          Back to Top
        </button>
      </div>


      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} KickOff. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
