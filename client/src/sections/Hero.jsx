import { FiArrowRight, FiCalendar } from "react-icons/fi";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-32 text-center lg:px-8">
          
          {/* Top Badge */}
          <div className="mb-8 rounded-full border border-[#D4A85A]/40 bg-[#D4A85A]/10 px-8 py-3 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Premium Grooming Experience
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-6xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            Where Tradition Meets
            <span className="block text-[#D4A85A]">
              Modern Style
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-gray-300 sm:text-xl">
            Expert cuts, precision fades, and classic grooming services in the
            heart of downtown. Walk-ins welcome, appointments preferred.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row">
            
            <button className="flex items-center justify-center gap-3 rounded-xl bg-[#D4A85A] px-10 py-5 text-lg font-medium text-black transition duration-300 hover:scale-[1.02]">
              Book Appointment
              <FiCalendar className="text-xl" />
            </button>

            <button className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-medium backdrop-blur-md transition duration-300 hover:bg-white/10">
              View Services
              <FiArrowRight className="text-xl" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-24 grid w-full max-w-4xl grid-cols-1 gap-12 border-t border-white/10 pt-14 sm:grid-cols-3">
            
            <div>
              <h3 className="text-5xl font-bold text-[#D4A85A]">
                15+
              </h3>

              <p className="mt-3 text-lg text-gray-300">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#D4A85A]">
                5K+
              </h3>

              <p className="mt-3 text-lg text-gray-300">
                Happy Clients
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#D4A85A]">
                4.9★
              </h3>

              <p className="mt-3 text-lg text-gray-300">
                Google Rating
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;