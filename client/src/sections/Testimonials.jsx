import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";

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

  const nextReview = () => {
    setActiveReview((current) =>
      current === reviews.length - 1 ? 0 : current + 1
    );
  };

  const previousReview = () => {
    setActiveReview((current) =>
      current === 0 ? reviews.length - 1 : current - 1
    );
  };

  const review = reviews[activeReview];

  return (
    <section className="relative bg-black px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Client Reviews
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight sm:text-6xl">
            What Our Clients
            <span className="block text-[#D4A85A]">Are Saying</span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex gap-1 text-[#D4A85A]">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={26} fill="currentColor" />
              ))}
            </div>

            <p className="text-lg text-gray-300">
              <span className="font-semibold text-white">4.9 out of 5</span>
              <span className="text-gray-500"> · 500+ reviews</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <button
            onClick={previousReview}
            className="absolute left-[-70px] top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-[#D4A85A] hover:text-black"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-12 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
            <div className="mb-8 flex items-center gap-3 text-[#D4A85A]">
              <Quote size={44} className="opacity-50" />

              {[...Array(5)].map((_, index) => (
                <Star key={index} size={24} fill="currentColor" />
              ))}
            </div>

            <p className="text-2xl font-light leading-relaxed text-white">
              "{review.text}"
            </p>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{review.name}</h3>
                  <p className="mt-1 text-lg text-gray-400">{review.role}</p>
                </div>

                <p className="text-gray-400">{review.time}</p>
              </div>
            </div>
          </div>

          <button
            onClick={nextReview}
            className="absolute right-[-70px] top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-[#D4A85A] hover:text-black"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {reviews.map((reviewItem, index) => (
            <button
              key={reviewItem.name}
              onClick={() => setActiveReview(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeReview === index
                  ? "w-10 bg-[#D4A85A]"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;