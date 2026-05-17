import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <section
      id="services"
      className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        variants={containerVariants}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 sm:mb-8 sm:px-6 sm:py-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
              Premium Services
            </p>
          </div>

          <h2 className="text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Expert Grooming
            <span className="block text-[#D4A85A]">Services</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
            From classic cuts to modern fades, our services are designed to make
            you look and feel your best.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 transition duration-300 hover:border-[#D4A85A]/50 hover:shadow-[0_0_40px_rgba(212,168,90,0.12)] sm:p-7 lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#D4A85A]/10 text-[#D4A85A] sm:h-14 sm:w-14">
                    <Icon aria-hidden="true" size={26} strokeWidth={1.8} />
                  </div>

                  <p className="text-3xl font-bold text-[#D4A85A]">
                    {service.price}
                  </p>
                </div>

                <h3 className="mt-7 text-2xl font-bold sm:mt-8">
                  {service.title}
                </h3>

                <p className="mt-4 border-b border-white/10 pb-6 text-base font-light leading-relaxed text-gray-300 lg:min-h-[128px]">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 text-[15px] text-gray-300">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A85A]"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-4 font-semibold transition duration-300 hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:mt-10"
                >
                  Book Now
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;