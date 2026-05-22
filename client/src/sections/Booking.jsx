import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
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

const Booking = ({ openBookingModal }) => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-black" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        variants={containerVariants}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 backdrop-blur-sm sm:mb-8 sm:px-6 sm:py-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
              Book Your Appointment
            </p>
          </div>

          <h2 className="text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Ready for Your
            <span className="block text-[#D4A85A]">Best Look Yet?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
            Book your appointment online or give us a call. Walk-ins always
            welcome, but appointments get priority seating.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8"
        >
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -6 }}
            href="tel:+12705040018"
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-md transition duration-300 hover:border-[#D4A85A]/50 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:p-10 lg:p-12"
          >
            <Phone
              aria-hidden="true"
              className="mx-auto text-[#D4A85A]"
              size={44}
            />

            <h3 className="mt-6 text-2xl font-semibold sm:mt-8">
              Call to Book
            </h3>

            <p className="mt-3 text-base text-gray-300 sm:mt-4 sm:text-lg">
              Quick and easy phone booking
            </p>

            <p className="mt-5 break-words text-2xl font-bold tracking-wide text-[#D4A85A] sm:mt-6 sm:text-3xl">
              <a href="tel:+12705040018" className="transition duration-300 hover:text-[#D4A85A]">
                (270) 504-0018
              </a>
            </p>
          </motion.a>

          <motion.button
            type="button"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            onClick={openBookingModal}
            className="group rounded-2xl bg-[#D4A85A] p-7 text-center text-black shadow-[0_0_50px_rgba(212,168,90,0.18)] transition duration-300 hover:bg-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:p-10 lg:p-12"
          >
            <CalendarDays aria-hidden="true" className="mx-auto" size={44} />

            <h3 className="mt-6 text-2xl font-semibold sm:mt-8">
              Book Online
            </h3>

            <p className="mt-3 text-base sm:mt-4 sm:text-lg">
              24/7 online scheduling
            </p>

            <span className="mt-6 inline-flex text-lg font-bold sm:mt-7">
              Choose Your Time →
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-10 border-t border-white/10 pt-10 sm:mt-12 sm:pt-12"
        >
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            >
              <Clock
                aria-hidden="true"
                className="shrink-0 text-[#D4A85A]"
                size={40}
              />

              <div>
                <h3 className="text-xl font-semibold">Hours</h3>
                <p className="mt-2 leading-relaxed text-gray-300">
                  Mon: 9am-5pm · Tue: Closed
                  <br />
                  Wed: 11am-7pm · Thu: 9am-5pm
                  <br />
                  Fri: 11am-7pm · Sat: 9am-3pm · Sun: Closed
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            >
              <MapPin
                aria-hidden="true"
                className="shrink-0 text-[#D4A85A]"
                size={40}
              />

              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p className="mt-2 leading-relaxed text-gray-300">
                  237 South Main Street
                  <br />
                  Hartford, KY 42347
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Booking;