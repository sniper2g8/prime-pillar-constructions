import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us | PrimePillar Constructions',
  description: 'Learn about PrimePillar Constructions Ltd, our vision, mission, core values, and leadership team.',
  openGraph: {
    title: 'About Us | PrimePillar Constructions',
    description: 'Learn about PrimePillar Constructions Ltd, our vision, mission, core values, and leadership team.',
    url: 'https://www.primepillargh.com/about',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function AboutPage() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                About PrimePillar Constructions
              </h1>
              <p className="text-xl text-gray-200">
                Building the foundations of Ghana's infrastructure development with integrity, excellence, and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary-500 mb-4">Our Vision</h2>
                <p className="text-gray-700">
                  To be the leading construction company in West Africa, recognized for excellence in delivering 
                  innovative, sustainable, and high-quality construction solutions that contribute to the region's 
                  economic development and infrastructure growth.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary-500 mb-4">Our Mission</h2>
                <p className="text-gray-700">
                  To provide exceptional construction services through innovative solutions, skilled workforce, 
                  and cutting-edge technology, while maintaining the highest standards of safety, quality, and 
                  environmental responsibility in all our projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide our operations and define our corporate culture.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-primary-500 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Directors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the visionary directors leading PrimePillar Constructions towards excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Smaila Shaibu Mensah</h3>
                  <p className="text-accent-500 font-medium mb-3">Co-Founder & Director</p>
                  <p className="text-gray-700 mb-4">
                    Brings a unique blend of technological innovation and practical construction knowledge. 
                    Expertise in integrating modern technology with construction processes ensures efficiency 
                    and precision in project delivery.
                  </p>
                  <div className="bg-gray-100 p-4 rounded">
                    <p className="text-sm font-medium text-gray-900">Qualifications</p>
                    <p className="text-sm text-gray-700">
                      B.Tech in Computer Science and Engineering, PCTE Institute of Engineering and Technology, Ludhiana, India
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Nana Osei Yaw</h3>
                  <p className="text-accent-500 font-medium mb-3">Co-Founder & Director</p>
                  <p className="text-gray-700 mb-4">
                    Applies strong analytical and problem-solving skills to project planning, cost estimation, 
                    and quality assurance. Mathematical precision ensures every project is executed with accuracy 
                    and excellence.
                  </p>
                  <div className="bg-gray-100 p-4 rounded">
                    <p className="text-sm font-medium text-gray-900">Qualifications</p>
                    <p className="text-sm text-gray-700">
                      BSc in Mathematics, Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capacity Statement */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Capacity</h2>
              <p className="text-gray-700 text-lg mb-8">
                With over 10 years of experience in the construction industry, PrimePillar Constructions has 
                successfully delivered projects for major clients in the mining, oil & gas, and government sectors. 
                Our team combines technical expertise with practical knowledge to deliver projects on time and within budget.
              </p>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary-500 mb-4">Local Content Commitment</h3>
                <p className="text-gray-700">
                  As a 100% Ghanaian-owned company, we are committed to maximizing local participation in all our projects. 
                  We prioritize hiring local talent, sourcing materials locally, and partnering with Ghanaian businesses 
                  to contribute to the economic development of our communities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}