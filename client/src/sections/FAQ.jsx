import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do I need an appointment or can I walk in?",
    answer:
      "We welcome both! Walk-ins are always accepted, but appointments are recommended to guarantee your preferred time and barber.",
  },
  {
    question: "How long does a typical haircut take?",
    answer:
      "Most haircuts take 30–45 minutes depending on the style and service. Fades and detailed work may take longer.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "We accept major credit cards, debit cards, cash, Apple Pay, and Google Pay.",
  },
  {
    question: "Can I request a specific barber?",
    answer:
      "Absolutely. When booking, you can select your preferred barber or ask our staff for recommendations.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Just bring yourself. Reference photos are helpful if you have a specific style in mind.",
  },
  {
    question: "Do you offer services for kids?",
    answer:
      "Yes, we offer kids cuts for children under 12.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least 24 hours notice for cancellations or rescheduling.",
  },
  {
    question: "Do you sell grooming products?",
    answer:
      "Yes, we carry premium pomades, beard oils, shampoos, and styling products.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp}>
            <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 sm:mb-8 sm:px-6 sm:py-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
                Questions?
              </p>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Frequently Asked
            <span className="block text-[#D4A85A]">Questions</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:mt-6 sm:text-lg"
          >
            Everything you need to know about our services and policies.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 space-y-4 sm:mt-16 sm:space-y-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                className={`overflow-hidden rounded-xl border transition ${
                  isOpen ? "border-[#D4A85A]/40" : "border-white/10"
                } bg-gradient-to-b from-white/[0.05] to-white/[0.02]`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-5 text-left text-lg font-semibold sm:px-6 sm:py-6 sm:text-xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                >
                  {faq.question}
                  <ChevronDown
                    className={`text-[#D4A85A] transition duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={22}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="px-5 py-5 text-base leading-relaxed text-gray-300 sm:px-6 sm:py-6 sm:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 text-center sm:mt-16 sm:p-12"
        >
          <h3 className="text-2xl font-bold sm:text-3xl">Still have questions?</h3>

          <p className="mt-4 text-gray-300 sm:mt-5 sm:text-lg">
            Our team is here to help. Give us a call or stop by the shop.
          </p>

          <a
            href="#contact"
            className="mt-6 inline-block rounded-lg bg-[#D4A85A] px-8 py-3 text-lg font-semibold text-black transition duration-300 hover:bg-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:mt-8 sm:px-10 sm:py-4"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;