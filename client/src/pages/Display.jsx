import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const weeklyHours = {
  0: "Closed",
  1: "9AM - 5PM",
  2: "Closed",
  3: "11AM - 7PM",
  4: "9AM - 5PM",
  5: "11AM - 7PM",
  6: "9AM - 3PM",
};

const weeklyHoursText =
  "Mon & Thu 9AM - 5PM  • Wed & Fri: 11AM - 7PM • Sat: 9AM - 3PM  • Tue & Sun: Closed";

const getTodayHours = () => {
  const today = new Date().getDay();
  return weeklyHours[today];
};

const slides = [
  "status",
  "wait",
  "galleryOne",
  "galleryTwo",
  "announcement",
  "gift",
];

const Display = () => {
  const [settings, setSettings] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const loadSettings = () => {
      fetch(`${API_URL}/api/display`)
        .then((res) => res.json())
        .then((data) => setSettings(data))
        .catch(console.error);
    };

    loadSettings();

    const refreshInterval = setInterval(loadSettings, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!settings) {
    return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="h-24 w-24 rounded-full border-4 border-[#D4A85A]/30 border-t-[#D4A85A] animate-spin" />

        <h2 className="mt-8 text-3xl font-bold text-[#D4A85A]">
            Main Street Barbershop
        </h2>

        <p className="mt-2 text-xl text-gray-300">
            Preparing today's display...
        </p>
    </div>
    );
  }

  const currentSlide = slides[slide];
  const todayHours = getTodayHours();

  const galleryImages = settings.galleryImages || [];
  const galleryOne = galleryImages.slice(0, 3);
  const galleryTwo = galleryImages.slice(3, 6);

  const renderGallery = (images) => (
    <>
      <p className="mb-5 text-3xl uppercase tracking-[0.4em] text-[#D4A85A]">
        Recent Cuts
      </p>

      <h2 className="mb-10 text-7xl font-black uppercase">
        Fresh From The Chair
      </h2>

      <div className="grid w-full max-w-[2560px] grid-cols-3 gap-8 px-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-[4/5] overflow-hidden rounded-3xl border-2 border-[#D4A85A]/50 bg-black/70 shadow-2xl"
          >
            <img
              src={
                image?.startsWith("/uploads")
                  ? `${API_URL}${image}`
                  : image
              }
              alt={`Recent haircut ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
  
  const isMobileView = window.innerWidth < 768;

  if (isMobileView) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <h1 className="text-3xl font-black text-[#D4A85A]">
          Display Not Available
        </h1>

        <p className="mt-4 max-w-md text-lg text-gray-300">
          This display is designed for the in-shop TV screen and is not eligible for mobile view.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white pb-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3a2a10,transparent_35%),linear-gradient(135deg,#000,#111,#000)]" />

      <div
        key={`bg-${slide}`}
        className="absolute inset-0 opacity-20 bg-[url('/barbershop-bg.jpg')] bg-cover bg-center animate-bgZoom"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div
        key={slide}
        className="relative z-10 flex h-screen flex-col items-center justify-center px-10 pb-24 text-center animate-fadeSlide"
      >
        {currentSlide === "status" && (
          <>
            <p className="mb-4 text-3xl uppercase tracking-[0.4em] text-[#D4A85A]">
              Main Street Barbershop
            </p>

            <h1 className="text-[10rem] leading-none font-black uppercase drop-shadow-2xl">
              {settings.shopStatus}
            </h1>

            <div className="mt-10 rounded-2xl border border-[#D4A85A]/50 bg-black/60 px-10 py-5 shadow-2xl">
              <p className="text-3xl font-semibold text-[#D4A85A]">
                Today&apos;s Hours
              </p>

              <p className="mt-2 text-5xl font-bold">{todayHours}</p>
            </div>
          </>
        )}

        {currentSlide === "wait" && (
          <>
            {settings.shopStatus === "closed" ? (
              <>
                <p className="mb-6 text-3xl uppercase tracking-[0.4em] text-[#D4A85A]">
                  Thanks For Visiting 
                </p>

                <div className="rounded-3xl border-4 border-red-500 bg-black/70 px-20 py-16 shadow-2xl">
                  <p className="text-8xl font-black uppercase text-red-500">
                    Closed 
                  </p>

                  <p className="mt-6 text-4xl">
                    We look forward to your next visit.
                  </p>  
                </div>
              </>
             ) : (
                <>
                  <p className="mb-6 text-3xl uppercase tracking-[0.4em] text-[#D4A85A]">
                    Current Wait Time
                  </p>

                  <div className="rounded-full border-4 border-[#D4A85A] bg-black/70 px-20 py-16 shadow-2xl animate-pulseGold">
                    <p className="text-[11rem] leading-none font-black text-[#D4A85A]">
                      {settings.waitTime}
                    </p>
                  </div>

                  <p className="mt-10 text-4xl">
                    Walk-ins are welcome
                  </p>
                </>
            )}
          </>
        )}

        {currentSlide === "galleryOne" && renderGallery(galleryOne)}

        {currentSlide === "galleryTwo" && renderGallery(galleryTwo)}

        {currentSlide === "announcement" && (
          <>
            <p className="mb-6 text-3xl uppercase tracking-[0.4em] text-[#D4A85A]">
              Announcement
            </p>

            <div className="max-w-5xl rounded-3xl border border-[#D4A85A]/50 bg-black/70 px-16 py-12 shadow-2xl">
              <p className="text-6xl font-bold leading-tight">
                {settings.announcement}
              </p>
            </div>
          </>
        )}

        {currentSlide === "gift" && (
          <>
            <p className="mb-6 text-3xl uppercase tracking-[0.4em] text-[#D4A85A]">
              Perfect Gift Idea
            </p>

            <div className="max-w-5xl rounded-3xl border-4 border-[#D4A85A] bg-gradient-to-br from-[#D4A85A] to-[#8a6428] px-16 py-14 text-black shadow-2xl">
              <h2 className="text-7xl font-black uppercase">
                Give the Gift of Style
              </h2>

              <p className="mt-8 text-5xl font-bold">
                {settings.giftCertificateText}
              </p>
            </div>

            <p className="mt-10 text-4xl">Ask your barber before you leave</p>
          </>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between bg-black/80 px-10 py-5 text-2xl">
        <span className="font-bold text-[#D4A85A]">
          Main Street Barbershop
        </span>

        <span>{weeklyHoursText}</span>
      </div>
    </div>
  );
};

export default Display;