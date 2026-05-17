import { motion } from "framer-motion";

const galleryImages = [
  {
    label: "Fresh Fade",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1974&auto=format&fit=crop",
  },
  {
    label: "Beard Work",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1974&auto=format&fit=crop",
  },
  {
    label: "Tools",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1974&auto=format&fit=crop",
  },
  {
    label: "Classic Cut",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1974&auto=format&fit=crop",
  },
  {
    label: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1974&auto=format&fit=crop",
  },
  {
    label: "Shop Interior",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1974&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-5 py-2.5 sm:mb-8 sm:px-6 sm:py-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D4A85A] sm:text-sm">
              Our Work
            </p>
          </div>

          <h2 className="text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Recent Cuts
            <span className="block text-[#D4A85A]">& Styles</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
            Explore our portfolio of precision cuts, fades, and grooming work.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6"
        >
          {galleryImages.map((item) => (
            <motion.article
              key={item.label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[420px] lg:h-[500px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="inline-flex rounded-full bg-[#D4A85A] px-4 py-2 text-sm font-semibold text-black sm:px-5">
                  {item.label}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Gallery;