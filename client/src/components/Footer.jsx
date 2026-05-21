import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-[0.14em] text-[#D4A85A] sm:text-3xl">
              MAIN STREET
            </h2>

            <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
              Premium men&apos;s grooming and barbershop services in the heart
              of downtown since 2009.
            </p>

            <div className="mt-6 flex gap-4 sm:mt-8">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black"
              >
                <FaFacebook size={22} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>

            <nav className="mt-6 space-y-4 text-gray-300 sm:mt-8">
              <a href="#services" className="block transition hover:text-[#D4A85A]">
                Services
              </a>
              <a href="#team" className="block transition hover:text-[#D4A85A]">
                Our Team
              </a>
              <a href="#gallery" className="block transition hover:text-[#D4A85A]">
                Gallery
              </a>
              <a href="#contact" className="block transition hover:text-[#D4A85A]">
                Book Now
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Hours</h3>

            <div className="mt-6 space-y-5 sm:mt-8">
              {[
                ["Monday - Friday", "9:00 AM - 8:00 PM"],
                ["Saturday", "8:00 AM - 6:00 PM"],
                ["Sunday", "10:00 AM - 4:00 PM"],
              ].map(([day, time]) => (
                <div key={day} className="flex gap-4">
                  <Clock
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#D4A85A]"
                    size={22}
                  />
                  <div>
                    <p className="font-semibold">{day}</p>
                    <p className="mt-1 text-gray-300">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Contact</h3>

            <div className="mt-6 space-y-5 text-gray-300 sm:mt-8">
              <div className="flex gap-4">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[#D4A85A]"
                  size={22}
                />
                <p>
                  123 Main Street
                  <br />
                  Downtown, CA 90210
                </p>
              </div>

              <a
                href="tel:5551234567"
                className="flex gap-4 transition hover:text-[#D4A85A]"
              >
                <Phone
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[#D4A85A]"
                  size={22}
                />
                <span>(555) 123-4567</span>
              </a>

              <a
                href="mailto:hello@mainstreetbarber.com"
                className="flex gap-4 break-words transition hover:text-[#D4A85A]"
              >
                <Mail
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[#D4A85A]"
                  size={22}
                />
                <span>hello@mainstreetbarber.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 sm:mt-16 sm:pt-10 lg:mt-20">
          <div className="mb-8 h-[220px] overflow-hidden rounded-xl bg-[#e5e3de] sm:mb-10 sm:h-[260px]">
            <div className="flex h-full items-start p-4">
              <a
                href="https://maps.app.goo.gl/KynbXSfZZqzL8mvU7"
                className="rounded bg-white px-4 py-2 text-sm text-blue-600 shadow transition hover:bg-gray-100"
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-sm text-gray-300 sm:text-base md:flex-row md:items-center md:justify-between">
            <p>© 2026 Main Street Barbershop. All rights reserved. Made By: <em><a href="https://redlinesystemsco.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4A85A]">
              Redline Systems Co.
            </a></em></p>

            <div className="flex flex-wrap gap-5 sm:gap-8 md:justify-end">
              <a href="#" className="transition hover:text-[#D4A85A]">
                Privacy Policy
              </a>

              <a href="#" className="transition hover:text-[#D4A85A]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;