import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Leslie Ferguson",
    role: "New Customer",
    time: "1 month ago",
    text: "what a wonderful experience for my girls first hair cut! Brittany was so patient with her. My girl was too scared for anything, she came straight to her, in the waiting chair and cut her hair there while gently tending to her. Mark is such a wonderful man as well. They treated us with such kindness. Truly couldn’t have went to anyone better. Thank you for making L’s first haircut such a breeze. She looks so beautiful! 🩷",
  },
  {
    name: "Celena Hunt",
    role: "New Customer",
    time: "1 month ago",
    text: "mark was amazing w my 3 year old, he talked him through the hair cut & was very patient! definitely recommend him, he did amazing !",
  },
  {
    name: "Jessica A.",
    role: "New Customer",
    time: "1 month ago",
    text: "I just want to thank the staff for being so friendly and keeping the conversation going during the process lol sometimes haircuts can be unnerving for kids even if it's something they really want. This crew was amazing. Thank you guys!",
  },
  {
    name: "Caleb Rush",
    role: "New Customer",
    time: "1 year ago",
    text: "Got a great beard trim here! A great business that can take care of any hair needs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const nextReview = () => {
    setActiveReview((current) => (current + 1) % reviews.length);
  };

  const previousReview = () => {
    setActiveReview((current) =>
      current === 0 ? reviews.length - 1 : current - 1
    );
  };

  const review = reviews[activeReview];

  return (
    <section className="relative bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 sm:mb-8 sm:px-6 sm:py-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
              Client Reviews
            </p>
          </div>

          <h2 className="text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            What Our Clients
            <span className="block text-[#D4A85A]">Are Saying</span>
          </h2>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <div className="flex gap-1 text-[#D4A85A]">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  size={24}
                  fill="currentColor"
                />
              ))}
            </div>

            <p className="text-base text-gray-300 sm:text-lg">
              <span className="font-semibold text-white">4.8 out of 5</span>
              <span className="text-gray-500"> · 10+ reviews</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative mx-auto mt-12 max-w-5xl sm:mt-16 lg:mt-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)] sm:p-8 lg:p-12"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[#D4A85A] sm:mb-8">
                <Quote aria-hidden="true" size={40} className="opacity-50" />

                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      aria-hidden="true"
                      size={22}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              <p className="text-xl font-light leading-relaxed text-white sm:text-2xl">
                “{review.text}”
              </p>

              <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{review.name}</h3>
                    <p className="mt-1 text-base text-gray-400 sm:text-lg">
                      {review.role}
                    </p>
                  </div>

                  <p className="text-sm text-gray-400 sm:text-base">
                    {review.time}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3 overflow-x-auto px-1">
            <button
              type="button"
              onClick={previousReview}
              aria-label="Previous review"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:h-14 sm:w-14"
            >
              <ChevronLeft aria-hidden="true" size={28} />
            </button>

            <div className="flex shrink-0 justify-center gap-3">
              {reviews.map((reviewItem, index) => (
                <button
                  key={reviewItem.name}
                  type="button"
                  onClick={() => setActiveReview(index)}
                  aria-label={`Show review from ${reviewItem.name}`}
                  aria-current={activeReview === index ? "true" : "false"}
                  className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4A85A] ${
                    activeReview === index
                      ? "w-10 bg-[#D4A85A]"
                      : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:h-14 sm:w-14"
            >
              <ChevronRight aria-hidden="true" size={28} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;