import { FiArrowRight, FiCalendar } from "react-icons/fi";

const Hero = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 pt-32 text-center sm:px-6 md:pb-20 md:pt-36 lg:px-8 lg:pb-24 lg:pt-40">
        
        {/* Badge */}
        <div className="animate-[fadeIn_0.6s_ease] mb-7 rounded-full border border-[#D4A85A]/40 bg-[#D4A85A]/10 px-5 py-2.5 backdrop-blur-sm sm:px-7 sm:py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-xs">
            Premium Grooming Experience
          </p>
        </div>

        {/* Heading */}
        <h1 className="animate-[fadeIn_0.8s_ease] max-w-5xl text-[2.7rem] font-bold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Where Tradition Meets
          <span className="mt-2 block text-[#D4A85A]">
            Modern Style
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-[fadeIn_1s_ease] mt-7 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl">
          Expert cuts, precision fades, and classic grooming
          services in the heart of downtown. Walk-ins welcome,
          appointments preferred.
        </p>

        {/* Buttons */}
        <div className="animate-[fadeIn_1.2s_ease] mt-10 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center">
          
          <a
            href="#contact"
            className="flex items-center justify-center gap-3 rounded-xl bg-[#D4A85A] px-8 py-4 text-base font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:px-10 sm:py-5 sm:text-lg"
          >
            Book Appointment
            <FiCalendar className="text-xl" />
          </a>

          <a
            href="#services"
            className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-8 py-4 text-base font-medium text-white backdrop-blur-md transition duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 sm:px-10 sm:py-5 sm:text-lg"
          >
            View Services
            <FiArrowRight className="text-xl" />
          </a>
        </div>

        {/* Stats */}
        <div className="animate-[fadeIn_1.4s_ease] mt-16 grid w-full max-w-4xl grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:mt-20 sm:grid-cols-3 sm:gap-6 sm:pt-12 lg:mt-24 lg:gap-12 lg:pt-14">
          
          <div className="flex flex-col items-center">
            <h3 className="text-4xl font-bold text-[#D4A85A] sm:text-5xl">
              15+
            </h3>

            <p className="mt-2 text-base text-gray-300 sm:mt-3 sm:text-lg">
              Years Experience
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-4xl font-bold text-[#D4A85A] sm:text-5xl">
              5K+
            </h3>

            <p className="mt-2 text-base text-gray-300 sm:mt-3 sm:text-lg">
              Happy Clients
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-4xl font-bold text-[#D4A85A] sm:text-5xl">
              4.9★
            </h3>

            <p className="mt-2 text-base text-gray-300 sm:mt-3 sm:text-lg">
              Google Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;