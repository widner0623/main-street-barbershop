import { Award } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import hiringImage from "../assets/interior.jpeg";
import markImage from "../assets/mark.jpg";
import asaImage from "../assets/barber_asa.jpg";

const team = [
  {
    name: "Mark Ruddy",
    role: "Master Barber & Owner",
    years: "8 years",
    instagram: "@markmruddytoo",
    instagramLink: "https://www.instagram.com/markmruddytoo/",
    image: markImage,
    specialties: ["Classic Cuts", "Fades", "Straight Razor", "Designs", "Perms"],
  },
  {
    name: "Asa Virgil",
    role: "Master Barber",
    years: "1 year",
    instagram: "@asavirgil",
    instagramLink: "https://www.instagram.com/asavirgil/",
    image: asaImage,
    specialties: [],
  },
  // {
  //   name: "Now Hiring",
  //   role: "Licensed Barber Wanted",
  //   years: "Join Our Team",
  //   instagram: "",
  //   instagramLink: "",
  //   image: hiringImage,
  //   benefits: ["Competitive Pay", "Flexible Schedule", "Established Clientele", "Great Work Environment"],
  //   hiring: false,
  // },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Team = ({ openBookingModal }) => {
  return (
    <section
      id="team"
      className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 sm:mb-8 sm:px-6 sm:py-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
              Meet The Team
            </p>
          </div>

          <h2 className="text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Master Barbers
            <span className="block text-[#D4A85A]">At Your Service</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
            Our award-winning team brings passion, precision, and personality
            to every appointment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-10 sm:mt-16 lg:mt-20 lg:grid-cols-2"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[520px] lg:h-[620px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full bg-[#D4A85A] px-4 py-2 text-sm font-semibold text-black sm:bottom-6 sm:left-6 sm:px-5">
                  {member.years}
                </div>

                <a
                  href={member.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${member.name} on Instagram`}
                  className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
                >
                  <FaInstagram aria-hidden="true" size={22} />
                </a>

                <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A85A] text-black sm:right-6 sm:top-6 sm:h-14 sm:w-14">
                  <Award aria-hidden="true" size={24} />
                </div>
              </div>

              <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
                <h3 className="text-3xl font-bold sm:text-4xl">{member.name}</h3>

                <p className="mt-2 text-xl text-[#D4A85A] sm:mt-3 sm:text-2xl">
                  {member.role}
                </p>

                <p className="mt-2 text-base text-gray-400 sm:mt-3 sm:text-lg">
                  {member.instagram}
                </p>

                {member.specialties && (
                  <div className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-8">
                    <p className="mb-4 text-base text-gray-300 sm:mb-5 sm:text-lg">
                      Specialties:
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white sm:px-5"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.benefits && (
                  <div className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-8">
                    <p className="mb-4 text-base text-gray-300 sm:mb-5 sm:text-lg">
                      Benefits:
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {member.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white sm:px-5"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {!member.hiring && (
                <button
                  type="button"
                  onClick={() => openBookingModal({ barber: member.name })}
                  className="mt-8 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-base font-semibold transition duration-300 hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:mt-10 sm:py-5 sm:text-lg"
                >
                  Book with {member.name.split(" ")[0]}
                </button>
              )}

              {member.hiring && (
                <button
                  type="button"
                  onClick={() => window.location.href = "tel:+12705040018"}
                  className="mt-8 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-base font-semibold transition duration-300 hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:mt-10 sm:py-5 sm:text-lg"
                >
                    Call to Apply!
                </button>
              )}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Team;