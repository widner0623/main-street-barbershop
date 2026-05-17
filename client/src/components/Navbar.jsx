import { useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex h-[92px] max-w-[1400px] items-center justify-between px-8 lg:px-12">
        
        {/* Logo */}
        <a href="/" className="text-[2rem] font-semibold tracking-[0.16em] text-[#D4A85A]">
          MAIN STREET
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-12 md:flex">
          <a href="#services" className="text-[15px] font-light tracking-wide text-white transition duration-300 hover:text-[#D4A85A]">
            Services
          </a>

          <a href="#team" className="text-[15px] font-light tracking-wide text-white transition duration-300 hover:text-[#D4A85A]">
            Team
          </a>

          <a href="#gallery" className="text-[15px] font-light tracking-wide text-white transition duration-300 hover:text-[#D4A85A]">
            Gallery
          </a>

          <a href="#contact" className="text-[15px] font-light tracking-wide text-white transition duration-300 hover:text-[#D4A85A]">
            Contact
          </a>

          <button className="rounded-lg bg-[#D4A85A] px-8 py-3.5 text-[15px] font-medium text-black transition duration-300 hover:scale-[1.02]">
            Book Now
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-white md:hidden"
        >
          {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full w-full bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-6 py-10">
          <a href="#services" className="text-lg text-white">
            Services
          </a>

          <a href="#team" className="text-lg text-white">
            Team
          </a>

          <a href="#gallery" className="text-lg text-white">
            Gallery
          </a>

          <a href="#contact" className="text-lg text-white">
            Contact
          </a>

          <button className="mt-2 rounded-md bg-[#D4A85A] px-6 py-3 font-medium text-black">
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;