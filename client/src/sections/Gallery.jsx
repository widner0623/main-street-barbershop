const Gallery = () => {
  return (
    <section id="gallery" className="bg-black px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Our Work
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight sm:text-6xl">
            Recent Cuts
            <span className="block text-[#D4A85A]">& Styles</span>
          </h2>

          <p className="mt-8 text-lg font-light leading-relaxed text-gray-300">
            Explore our portfolio of precision cuts, fades, and grooming work.
          </p>
        </div>

        <div className="mt-20 columns-1 gap-6 md:columns-2 lg:columns-3">
          {galleryImages.map((item) => (
            <div
              key={item.label}
              className="group relative mb-6 overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />

              <span className="absolute bottom-5 left-5 rounded-full bg-[#D4A85A] px-5 py-2 text-sm font-medium text-black">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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

export default Gallery;