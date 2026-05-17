import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-[0.16em] text-[#D4A85A]">
              MAIN STREET
            </h2>

            <p className="mt-8 max-w-xs text-lg font-light leading-relaxed text-gray-300">
              Premium men&apos;s grooming and barbershop services in the heart
              of downtown since 2009.
            </p>

            <div className="mt-8 flex gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <Instagram size={22} />
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <Facebook size={22} />
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>

            <ul className="mt-8 space-y-5 text-gray-300">
              <li>• Services</li>
              <li>• Our Team</li>
              <li>• Gallery</li>
              <li>• Book Now</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Hours</h3>

            <div className="mt-8 space-y-6">
              {[
                ["Monday - Friday", "9:00 AM - 8:00 PM"],
                ["Saturday", "8:00 AM - 6:00 PM"],
                ["Sunday", "10:00 AM - 4:00 PM"],
              ].map(([day, time]) => (
                <div key={day} className="flex gap-4">
                  <Clock className="mt-1 text-[#D4A85A]" size={22} />
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

            <div className="mt-8 space-y-6 text-gray-300">
              <div className="flex gap-4">
                <MapPin className="mt-1 text-[#D4A85A]" size={22} />
                <p>
                  123 Main Street
                  <br />
                  Downtown, CA 90210
                </p>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 text-[#D4A85A]" size={22} />
                <p>(555) 123-4567</p>
              </div>

              <div className="flex gap-4">
                <Mail className="mt-1 text-[#D4A85A]" size={22} />
                <p>hello@mainstreetbarber.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="mb-10 h-[260px] overflow-hidden rounded-lg bg-[#e5e3de]">
            <div className="flex h-full items-start p-4">
              <button className="rounded bg-white px-4 py-2 text-sm text-blue-600 shadow">
                Open in Maps ↗
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-300">
            <p>© 2026 Main Street Barbershop. All rights reserved.</p>

            <div className="flex gap-10">
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