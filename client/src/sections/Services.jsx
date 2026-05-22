import { motion } from "framer-motion";
import {
  Scissors,
  Sparkles,
  BadgeCheck,
  UserRound,
  Smile,
  BriefcaseBusiness,
  SprayCan,
} from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Classic Haircut",
    price: "$20",
    description:
      "Clean and professional haircut tailored to your preferred style with detailed finishing and styling.",
    features: ["30 minutes", "Style consultation", "Clean finish"],
  },

  {
    icon: Smile,
    title: "Kids Cut",
    price: "$15",
    description:
      "Friendly and comfortable haircut service for children under 9 with patience, precision, and a relaxed atmosphere.",
    features: ["30 minutes", "Kid-friendly service", "Detailed lineup"],
  },

  {
    icon: UserRound,
    title: "Straight Razor Shave",
    price: "$15",
    description:
      "Traditional straight razor shave with hot towel preparation for a smooth, refreshing experience.",
    features: ["30 minutes", "Hot towel prep", "Smooth razor finish"],
  },

  {
    icon: BadgeCheck,
    title: "Beard Sculpting",
    price: "$15",
    description:
      "Precision beard trimming and shaping designed to sharpen your overall look and maintain clean lines.",
    features: ["30 minutes", "Beard lineup", "Detailed shaping"],
  },

  {
    icon: SprayCan,
    title: "Signature Design",
    price: "$5",
    description:
      "Custom razor designs and detailed hair art added to elevate your haircut with a unique personal touch.",
    features: ["Quick add-on", "Custom design work", "Precision detailing"],
  },

  {
    icon: Sparkles,
    title: "Precision Perm",
    price: "$70",
    description:
      "Professional perm service designed to add texture, volume, and long-lasting style customized to your look.",
    features: ["60 minutes", "Custom styling", "Long-lasting texture"],
  },

  {
    icon: BriefcaseBusiness,
    title: "The Executive",
    price: "$10",
    description:
      "Premium finishing service focused on enhancing your overall look with extra detailing and refinement.",
    features: ["30 minutes", "Premium detailing", "Enhanced finish"],
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

const Services = ({ openBookingModal }) => {
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
            From classic cuts to beard work, designs, and styling services, our
            barbers help you leave looking sharp and confident.
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

                <button
                  type="button"
                  onClick={() => openBookingModal({ service: service.title })}
                  className="mt-8 flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-4 font-semibold transition duration-300 hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:mt-10"
                >
                  Book Now
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;