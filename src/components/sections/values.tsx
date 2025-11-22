const values = [
  {
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our dealings and commitments."
  },
  {
    title: "Excellence",
    description: "We strive for perfection in every project, delivering quality that exceeds expectations."
  },
  {
    title: "Safety",
    description: "We prioritize the well-being of our team, clients, and communities above all else."
  },
  {
    title: "Innovation",
    description: "We embrace cutting-edge technologies and methodologies to drive construction excellence."
  },
  {
    title: "Sustainability",
    description: "We build with environmental responsibility and long-term community impact in mind."
  },
  {
    title: "Collaboration",
    description: "We work hand-in-hand with clients, partners, and stakeholders for shared success."
  }
];

export function Values() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide our operations and define our corporate culture.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-primary-500 mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}