import { useState } from "react";
import { Link } from "react-router-dom"; 
import Image from "./Image";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk(); // Clerk sign-out function

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 lg:px-16" >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image
          src="LogoBig.png"
          className="rounded-xl"
          w={64}
          h={64}
          alt="KickOff."
        />
        <span className="font-extrabold text-3xl tracking-widest">
          Kick
          <span className="font-extrabold text-primary text-customBlue ">Off.</span>
        </span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-4xl" onClick={() => setOpen((p) => !p)}>
          {open ? "✖" : "☰"}
        </button>

        {/* Mobile Link List */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#beecee] flex flex-col items-center justify-center gap-6 font-medium text-lg transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } z-50`} 
        >
          <button className="absolute top-6 right-6 text-4xl" onClick={() => setOpen(false)}>
            ✖
          </button>
          <Link to="/" className="hover:text-customBlue" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/trending" className="hover:text-customBlue" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/trending" className="hover:text-customBlue" onClick={() => setOpen(false)}>Top Stories</Link>
          <Link to="/about" className="hover:text-customBlue" onClick={() => setOpen(false)}>About</Link>

          <SignedOut>
            <Link to="/login">
              <button className="py-2 px-4 rounded-3xl bg-customBlue text-white">
                Log In
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <button 
              onClick={() => signOut()} 
              className="py-2 px-4 rounded-3xl bg-red-500 text-white">
              Sign Out
            </button>
          </SignedIn>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="hover:text-blue-800">Home</Link>
        <Link to="/trending" className="hover:text-blue-800">Trending</Link>
        <Link to="/trending" className="hover:text-blue-800">Top Stories</Link>
        <Link to="/about" className="hover:text-blue-800">About</Link>

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-customBlue text-white">
              Log In
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <button 
            onClick={() => signOut()} 
            className="py-2 px-4 rounded-3xl bg-red-500 text-white ml-4">
            Sign Out
          </button>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
