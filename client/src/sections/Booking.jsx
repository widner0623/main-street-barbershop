import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";

const Booking = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-28 text-white lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Book Your Appointment
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight sm:text-6xl">
            Ready for Your
            <span className="block text-[#D4A85A]">Best Look Yet?</span>
          </h2>

          <p className="mt-8 text-lg font-light leading-relaxed text-gray-300">
            Book your appointment online or give us a call. Walk-ins always
            welcome, but appointments get priority seating.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-md">
            <Phone className="mx-auto text-[#D4A85A]" size={48} />

            <h3 className="mt-8 text-2xl font-semibold">Call to Book</h3>

            <p className="mt-4 text-lg text-gray-300">
              Quick and easy phone booking
            </p>

            <p className="mt-6 text-3xl font-bold tracking-wide text-[#D4A85A]">
              (555) 123-4567
            </p>
          </div>

          <div className="rounded-2xl bg-[#D4A85A] p-12 text-center text-black shadow-[0_0_50px_rgba(212,168,90,0.18)]">
            <CalendarDays className="mx-auto" size={48} />

            <h3 className="mt-8 text-2xl font-semibold">Book Online</h3>

            <p className="mt-4 text-lg">24/7 online scheduling</p>

            <button className="mt-7 text-lg font-semibold">
              Choose Your Time →
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
              <Clock className="text-[#D4A85A]" size={40} />

              <div>
                <h3 className="text-xl font-semibold">Hours</h3>
                <p className="mt-2 text-gray-300">
                  Mon-Fri: 9am-8pm
                  <br />
                  Sat: 8am-6pm · Sun: 10am-4pm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
              <MapPin className="text-[#D4A85A]" size={40} />

              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p className="mt-2 text-gray-300">
                  123 Main Street
                  <br />
                  Downtown, CA 90210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;