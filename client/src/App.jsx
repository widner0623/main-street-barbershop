import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Team from "./sections/Team";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Booking from "./sections/Booking";
import FAQ from "./sections/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Team />
      <Gallery />
      <Testimonials />
      <Booking />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;