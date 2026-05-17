import {
  FiScissors,
  FiAward,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

const features = [
  {
    icon: FiScissors,
    title: "Precision",
    text: "Every cut is crafted with meticulous attention to detail and years of expertise.",
  },
  {
    icon: FiAward,
    title: "Excellence",
    text: "We maintain the highest standards in service, technique, and customer care.",
  },
  {
    icon: FiHeart,
    title: "Tradition",
    text: "Classic barbering techniques passed down through generations of master barbers.",
  },
  {
    icon: FiUsers,
    title: "Community",
    text: "More than a barbershop — a gathering place where neighbors become family.",
  },
];

const About = () => {
  return (
    <section className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:min-h-[600px]">
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 lg:absolute lg:left-0 lg:top-0 lg:block lg:h-[420px] lg:w-[330px]">
            <img
              src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1974&auto=format&fit=crop"
              alt="Classic barbershop tools and grooming setup"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 sm:h-[450px] lg:ml-40 lg:mt-28 lg:h-[500px] lg:max-w-[420px]">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1974&auto=format&fit=crop"
              alt="Barber giving a professional haircut"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 sm:mb-8 sm:px-6 sm:py-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
              Our Story
            </p>
          </div>

          <h2 className="max-w-2xl text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            A Legacy of
            <span className="block text-[#D4A85A]">Craftsmanship</span>
          </h2>

          <div className="mt-7 space-y-5 text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg lg:mt-10 lg:space-y-7">
            <p>
              Since 2009, Main Street Barbershop has been the cornerstone of
              men’s grooming in our community. What started as a single chair
              operation has grown into a premium destination where tradition
              meets contemporary style.
            </p>

            <p>
              Our master barbers bring decades of combined experience, blending
              time-honored techniques with modern trends to deliver exceptional
              results every time. We believe in the power of a great haircut to
              transform not just your look, but your confidence.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 transition duration-300 hover:border-[#D4A85A]/40 sm:p-7 lg:p-8"
                >
                  <Icon
                    aria-hidden="true"
                    className="text-3xl text-[#D4A85A] sm:text-4xl"
                  />

                  <h3 className="mt-6 text-xl font-semibold sm:mt-7 sm:text-2xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:mt-4 sm:text-base">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;