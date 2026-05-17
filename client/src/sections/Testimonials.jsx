import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Michael Thompson",
    role: "Business Professional",
    time: "2 weeks ago",
    text: "Been coming here for 3 years. The barbers are true masters of their craft. Every cut is perfect, and the atmosphere is unmatched. This isn't just a barbershop — it's an experience.",
  },
  {
    name: "David Miller",
    role: "Local Customer",
    time: "1 month ago",
    text: "Clean shop, great service, and sharp results every time. They take their time and make sure you leave looking right.",
  },
  {
    name: "Chris Johnson",
    role: "Regular Client",
    time: "2 months ago",
    text: "Best fade I’ve had in years. Professional, friendly, and the attention to detail is exactly what you want from a barbershop.",
  },
  {
    name: "Anthony Brooks",
    role: "Walk-in Customer",
    time: "3 months ago",
    text: "Walked in for a quick cut and left impressed. Great atmosphere, great conversation, and an even better haircut.",
  },
  {
    name: "Ryan Carter",
    role: "Returning Client",
    time: "4 months ago",
    text: "The quality is consistent every single time. You can tell they care about their work and their customers.",
  },
];

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, []);

  const nextReview = () => setActiveReview((current) => (current + 1) % reviews.length);
  const previousReview = () =>
    setActiveReview((current) => (current === 0 ? reviews.length - 1 : current - 1));

  const review = reviews[activeReview];

  return (
    <section className="relative bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
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
                <Star key={index} aria-hidden="true" size={24} fill="currentColor" />
              ))}
            </div>

            <p className="text-base text-gray-300 sm:text-lg">
              <span className="font-semibold text-white">4.9 out of 5</span>
              <span className="text-gray-500"> · 500+ reviews</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16 lg:mt-20">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)] sm:p-8 lg:p-12">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-[#D4A85A] sm:mb-8">
              <Quote aria-hidden="true" size={40} className="opacity-50" />

              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} aria-hidden="true" size={22} fill="currentColor" />
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
                  <p className="mt-1 text-base text-gray-400 sm:text-lg">{review.role}</p>
                </div>

                <p className="text-sm text-gray-400 sm:text-base">{review.time}</p>
              </div>
            </div>
          </div>

          {/* Mobile-friendly arrows and dots */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={previousReview}
                aria-label="Previous review"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:h-14 sm:w-14"
              >
                <ChevronLeft aria-hidden="true" size={28} />
              </button>

              <div className="flex justify-center gap-3">
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
                onClick={nextReview}
                aria-label="Next review"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-[#D4A85A] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black sm:h-14 sm:w-14"
              >
                <ChevronRight aria-hidden="true" size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;