import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Team from "../sections/Team";
import Gallery from "../sections/Gallery";
import Testimonials from "../sections/Testimonials";
import Booking from "../sections/Booking";
import FAQ from "../sections/FAQ";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const openBookingModal = ({service = "", barber = ""} = {}) => {
    setSelectedService(service);
    setSelectedBarber(barber);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedService("");
    setSelectedBarber("");
  };

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero openBookingModal={openBookingModal} />
      <About />
      <Services openBookingModal={openBookingModal} />
      <Team openBookingModal={openBookingModal} />
      <Gallery />
      <Testimonials />
      <Booking openBookingModal={openBookingModal} />
      <FAQ />
      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={closeBookingModal} 
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        onSuccess={() => setBookingSuccess(true)}
        onError={(message) => setBookingError(message)}
      />

      {bookingSuccess && (
        <div className="fixed bottom-8 left-1/2 z-[80] w-[90%] max-w-sm -translate-x-1/2 rounded-xl bg-[#D4A85A] px-6 py-4 text-black shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">
              Appointment request submitted successfully!
            </p>

            <button
              onClick={() => setBookingSuccess(false)}
              className="text-lg font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}

      { bookingError && (
        <div className="fixed bottom-8 left-1/2 z-[80] w-[90%] max-w-sm -translate-x-1/2 rounded-xl bg-red-600 px-6 py-4 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">
              {bookingError}
            </p>

            <button
              onClick={() => setBookingError(false)}
              className="text-lg font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;