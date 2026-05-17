import { ChevronDown } from "lucide-react";
import { useState } from "react";

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-black px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Questions?
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight sm:text-6xl">
            Frequently Asked
            <span className="block text-[#D4A85A]">Questions</span>
          </h2>

          <p className="mt-8 text-lg font-light text-gray-300">
            Everything you need to know about our services and policies.
          </p>
        </div>

        <div className="mt-20 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border transition ${
                  isOpen
                    ? "border-[#D4A85A]/40"
                    : "border-white/10"
                } bg-gradient-to-b from-white/[0.05] to-white/[0.02]`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left text-xl font-semibold"
                >
                  {faq.question}

                  <ChevronDown
                    className={`text-[#D4A85A] transition duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={22}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-8 py-6 text-lg leading-relaxed text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-12 text-center">
          <h3 className="text-2xl font-bold">Still have questions?</h3>

          <p className="mt-4 text-gray-300">
            Our team is here to help. Give us a call or stop by the shop.
          </p>

          <button className="mt-8 rounded-lg bg-[#D4A85A] px-10 py-4 font-semibold text-black">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;