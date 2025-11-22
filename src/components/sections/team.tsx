const teamMembers = [
  {
    id: 1,
    name: "Smaila Shaibu Mensah",
    role: "Co-Founder & Director",
    title: "Director",
    bio: "Brings a unique blend of technological innovation and practical construction knowledge. Expertise in integrating modern technology with construction processes ensures efficiency and precision in project delivery.",
    qualifications: "B.Tech in Computer Science and Engineering, PCTE Institute of Engineering and Technology, Ludhiana, India",
    experience: "Over 10 years providing architectural services and road signage solutions for oil and gas industry and mining sector. Successfully delivered projects for TechnipFMC and Heat Gold Fields.",
    imageUrl: "/placeholder.jpg",
    isDirector: true,
  },
  {
    id: 2,
    name: "Nana Osei Yaw",
    role: "Co-Founder & Director",
    title: "Director",
    bio: "Applies strong analytical and problem-solving skills to project planning, cost estimation, and quality assurance. Mathematical precision ensures every project is executed with accuracy and excellence.",
    qualifications: "BSc in Mathematics, Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana",
    experience: "Over 5 years hands-on experience in construction industry. Currently serving as Project Supervisor on Ghana Armed Forces Burma Camp residential buildings project (subcontract for Desimone Ltd).",
    imageUrl: "/placeholder.jpg",
    isDirector: true,
  }
];

export function Team() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the visionary leaders driving PrimePillar Constructions towards excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-accent-500 font-medium mb-3">{member.title}</p>
                <p className="text-gray-700 mb-4">{member.bio}</p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm font-medium text-gray-900">Qualifications</p>
                  <p className="text-sm text-gray-700">{member.qualifications}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}