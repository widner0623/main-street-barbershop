import {
  Scissors,
  Sparkles,
  BadgeCheck,
  UserRound,
  Smile,
  BriefcaseBusiness,
} from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Classic Haircut",
    price: "$35",
    description:
      "Traditional scissor cut with consultation, shampoo, and styling. Includes hot towel treatment.",
    features: ["30 minutes", "Hot towel finish", "Style consultation"],
  },
  {
    icon: Sparkles,
    title: "Precision Fade",
    price: "$45",
    description:
      "Expert fade techniques from skin to any length. Perfectly blended transitions and clean lines.",
    features: ["45 minutes", "Multiple clipper guards", "Detailed edge work"],
  },
  {
    icon: BadgeCheck,
    title: "Beard Sculpting",
    price: "$30",
    description:
      "Professional beard trimming, shaping, and conditioning. Includes beard oil application.",
    features: ["25 minutes", "Premium beard oil", "Hot towel treatment"],
  },
  {
    icon: UserRound,
    title: "Straight Razor Shave",
    price: "$40",
    description:
      "Traditional hot lather shave with straight razor. The ultimate grooming experience.",
    features: ["40 minutes", "Multiple hot towels", "Post-shave balm"],
  },
  {
    icon: Smile,
    title: "Kids Cut",
    price: "$25",
    description:
      "Gentle and patient service for children under 12. Fun atmosphere, great results.",
    features: ["20 minutes", "Patient barbers", "Lollipop included"],
  },
  {
    icon: BriefcaseBusiness,
    title: "The Executive",
    price: "$85",
    description:
      "Complete grooming package: haircut, beard trim, straight razor shave, and facial treatment.",
    features: ["90 minutes", "Full premium service", "Complimentary drink"],
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-black px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Premium Services
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight sm:text-6xl">
            Expert Grooming
            <span className="block text-[#D4A85A]">Services</span>
          </h2>

          <p className="mt-8 text-lg font-light leading-relaxed text-gray-300">
            From classic cuts to modern fades, our services are designed to make
            you look and feel your best.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 transition duration-300 hover:border-[#D4A85A]/50 hover:shadow-[0_0_40px_rgba(212,168,90,0.12)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#D4A85A]/10 text-[#D4A85A]">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <p className="text-3xl font-bold text-[#D4A85A]">
                    {service.price}
                  </p>
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-5 min-h-[96px] border-b border-white/10 pb-7 text-[16px] font-light leading-relaxed text-gray-300">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 text-[15px] text-gray-300">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4A85A]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="mt-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-6 py-4 font-medium transition duration-300 hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black">
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;