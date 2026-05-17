import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-screen max-w-full border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 md:h-[92px] lg:px-12">
          <a
            href="/"
            aria-label="Main Street Barbershop home"
            onClick={closeMenu}
            className="min-w-0 flex-1 text-[1.15rem] font-semibold tracking-[0.08em] text-[#D4A85A] transition hover:text-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:text-2xl sm:tracking-[0.14em] md:flex-none lg:text-[2rem] lg:tracking-[0.16em]"
          >
            <span className="block sm:hidden">MAIN ST.</span>
            <span className="hidden sm:block">MAIN STREET</span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 md:flex lg:gap-12"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[18px] font-light tracking-wide text-white transition duration-300 hover:text-[#D4A85A] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              className="rounded-lg bg-[#D4A85A] px-7 py-3 text-[18px] font-medium text-black transition duration-300 hover:scale-[1.02] hover:bg-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black"
            >
              Book Now
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-3xl text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black md:hidden"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </header>

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition duration-300 md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-menu"
        className={`fixed left-0 top-20 z-50 max-h-[calc(100dvh-5rem)] w-screen overflow-y-auto border-t border-white/10 bg-black/95 px-4 py-6 shadow-2xl backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 text-[1.45rem] font-semibold tracking-wide text-white transition hover:border-[#D4A85A]/50 hover:bg-white/10 hover:text-[#D4A85A] focus:outline-none focus:ring-2 focus:ring-[#D4A85A]"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-3 w-full rounded-2xl bg-[#D4A85A] px-6 py-5 text-center text-[1.35rem] font-bold text-black transition hover:bg-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A]"
          >
            Book Now
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;