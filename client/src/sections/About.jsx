import {
  FiScissors,
  FiAward,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

const About = () => {
  return (
    <section className="bg-black px-6 py-28 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        
        {/* Left Images */}
        <div className="relative flex justify-center lg:justify-start">
          
          {/* Back Image */}
          <div className="absolute left-0 top-0 hidden h-[420px] w-[330px] overflow-hidden rounded-2xl border border-white/10 lg:block">
            <img
              src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1974&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Front Image */}
          <div className="relative z-10 mt-28 h-[500px] w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 sm:ml-32 lg:ml-40">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1974&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          
          {/* Badge */}
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Our Story
            </p>
          </div>

          {/* Heading */}
          <h2 className="max-w-2xl text-5xl font-bold leading-tight sm:text-6xl">
            A Legacy of
            <span className="block text-[#D4A85A]">
              Craftsmanship
            </span>
          </h2>

          {/* Paragraphs */}
          <div className="mt-10 space-y-8 text-lg font-light leading-relaxed text-gray-300">
            <p>
              Since 2009, Main Street Barbershop has been the
              cornerstone of men’s grooming in our community.
              What started as a single chair operation has grown
              into a premium destination where tradition meets
              contemporary style.
            </p>

            <p>
              Our master barbers bring decades of combined
              experience, blending time-honored techniques with
              modern trends to deliver exceptional results every
              time. We believe in the power of a great haircut
              to transform not just your look, but your confidence.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8">
              <FiScissors className="text-4xl text-[#D4A85A]" />

              <h3 className="mt-8 text-2xl font-semibold">
                Precision
              </h3>

              <p className="mt-4 text-gray-400">
                Every cut is crafted with meticulous attention
                to detail and years of expertise.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8">
              <FiAward className="text-4xl text-[#D4A85A]" />

              <h3 className="mt-8 text-2xl font-semibold">
                Excellence
              </h3>

              <p className="mt-4 text-gray-400">
                We maintain the highest standards in service,
                technique, and customer care.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8">
              <FiHeart className="text-4xl text-[#D4A85A]" />

              <h3 className="mt-8 text-2xl font-semibold">
                Tradition
              </h3>

              <p className="mt-4 text-gray-400">
                Classic barbering techniques passed down through
                generations of master barbers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8">
              <FiUsers className="text-4xl text-[#D4A85A]" />

              <h3 className="mt-8 text-2xl font-semibold">
                Community
              </h3>

              <p className="mt-4 text-gray-400">
                More than a barbershop — a gathering place where
                neighbors become family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;