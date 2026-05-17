import { Award } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const team = [
  {
    name: "Marcus Williams",
    role: "Master Barber & Owner",
    years: "15 years",
    instagram: "@marcuscuts",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1974&auto=format&fit=crop",
    specialties: ["Classic Cuts", "Fades", "Straight Razor"],
  },
  {
    name: "James Rodriguez",
    role: "Senior Barber",
    years: "12 years",
    instagram: "@jamesthebarber",
    image:
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=1974&auto=format&fit=crop",
    specialties: ["Modern Styles", "Beard Sculpting", "Hair Design"],
  },
];

const Team = () => {
  return (
    <section id="team" className="bg-black px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#D4A85A]/30 bg-[#D4A85A]/10 px-6 py-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4A85A]">
              Meet The Team
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight sm:text-6xl">
            Master Barbers
            <span className="block text-[#D4A85A]">
              At Your Service
            </span>
          </h2>

          <p className="mt-8 text-lg font-light leading-relaxed text-gray-300">
            Our award-winning team brings passion, precision,
            and personality to every appointment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {team.map((member) => (
            <div key={member.name}>
              
              {/* Image */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[620px] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Years Badge */}
                <div className="absolute bottom-6 left-6 rounded-full bg-[#D4A85A] px-5 py-2 text-sm font-medium text-black">
                  {member.years}
                </div>

                {/* Instagram */}
                <div className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                  <FaInstagram size={22} />
                </div>

                {/* Award */}
                <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A85A] text-black">
                  <Award size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-8">
                <h3 className="text-4xl font-bold">
                  {member.name}
                </h3>

                <p className="mt-3 text-2xl text-[#D4A85A]">
                  {member.role}
                </p>

                <p className="mt-3 text-lg text-gray-400">
                  {member.instagram}
                </p>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="mb-5 text-lg text-gray-300">
                    Specialties:
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-white"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-10 w-full rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 text-lg font-medium transition duration-300 hover:border-[#D4A85A]/50 hover:bg-[#D4A85A] hover:text-black">
                  Book with {member.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;