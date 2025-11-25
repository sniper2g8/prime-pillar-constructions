"use client";

import { useState } from "react";
import Image from "next/image";

const teamMembers = [
  {
    id: "smaila-shaibu-mensah",
    name: "Smaila Shaibu Mensah",
    role: "Co-Founder & Director",
    title: "Director",
    bio: "Brings a unique blend of technological innovation and practical construction knowledge. Expertise in integrating modern technology with construction processes ensures efficiency and precision in project delivery.",
    qualifications: "B.Tech in Computer Science and Engineering, PCTE Institute of Engineering and Technology, Ludhiana, India",
    experience: "Over 10 years providing architectural services and road signage solutions for oil and gas industry and mining sector. Successfully delivered projects for TechnipFMC and Heat Gold Fields.",
    imageUrl: "/teams/Smaila.jpg",
    isDirector: true,
  },
  {
    id: "nana-osei-yaw",
    name: "Nana Osei Yaw",
    role: "Co-Founder & Director",
    title: "Director",
    bio: "Applies strong analytical and problem-solving skills to project planning, cost estimation, and quality assurance. Mathematical precision ensures every project is executed with accuracy and excellence.",
    qualifications: "BSc in Mathematics, Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana",
    experience: "Over 5 years hands-on experience in construction industry. Currently serving as Project Supervisor on Ghana Armed Forces Burma Camp residential buildings project (subcontract for Desimone Ltd).",
    imageUrl: "/teams/nana-osei-yaw.jpeg",
    isDirector: true,
  }
];

export function Team() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the visionary leaders driving PrimePillar Constructions towards excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamWithoutHeading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {teamMembers.map((member) => (
        <TeamMember key={member.id} member={member} />
      ))}
    </div>
  );
}

function TeamMember({ member }: { member: typeof teamMembers[0] }) {
  const [imageSrc, setImageSrc] = useState(member.imageUrl);

  const handleImageError = () => {
    if (imageSrc !== "/placeholder.jpg") {
      setImageSrc("/placeholder.jpg");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gold-100">
      {/* Image Section */}
      <div className="md:w-2/5">
        <div className="h-64 md:h-full relative">
          <Image
            src={imageSrc}
            alt={member.name}
            fill
            className="object-cover"
            onError={handleImageError}
          />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="md:w-3/5 p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
            <span className="bg-gold-100 text-gold-800 text-sm font-bold px-3 py-1 rounded-full">
              {member.title}
            </span>
          </div>
          
          <p className="text-gold-600 font-bold mb-4">{member.role}</p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            {member.bio}
          </p>
        </div>
        
        <div className="border-t border-gold-200 pt-6">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Qualifications</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {member.qualifications}
          </p>
        </div>
      </div>
    </div>
  );
}