import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'HSE Policy | PrimePillar Constructions',
  description: 'Our Health, Safety, and Environment policy focused on zero harm objectives, compliance with OHSAS/ISO 45001 standards, and commitment to environmental protection in all our construction projects.',
  openGraph: {
    title: 'HSE Policy | PrimePillar Constructions',
    description: 'Our Health, Safety, and Environment policy focused on zero harm objectives, compliance with OHSAS/ISO 45001 standards, and commitment to environmental protection in all our construction projects.',
    url: 'https://www.primepillargh.com/hse',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

const commitments = [
  {
    title: "Zero Harm Objective",
    description: "Our unwavering commitment to ensuring that no worker, contractor, or member of the public is harmed as a result of our operations."
  },
  {
    title: "Risk Assessment",
    description: "Comprehensive risk assessments are conducted for all activities to identify and mitigate potential hazards before work begins."
  },
  {
    title: "Training and Competency",
    description: "All personnel receive appropriate HSE training relevant to their roles and responsibilities, with regular refresher sessions."
  },
  {
    title: "Personal Protective Equipment",
    description: "We provide appropriate personal protective equipment to all workers and ensure its proper use at all times."
  },
  {
    title: "Incident Reporting",
    description: "A robust incident reporting system encourages the reporting of all incidents, near misses, and hazards without fear of reprisal."
  },
  {
    title: "Continuous Improvement",
    description: "Regular reviews of our HSE performance inform continuous improvement initiatives to enhance safety outcomes."
  }
];

const standards = [
  {
    title: "OHSAS/ISO 45001",
    description: "Adherence to international occupational health and safety management system standards."
  },
  {
    title: "Minerals Commission",
    description: "Compliance with regulations and guidelines set by Ghana's Minerals Commission for mining operations."
  },
  {
    title: "Petroleum Commission",
    description: "Alignment with safety and environmental standards established by Ghana's Petroleum Commission."
  },
  {
    title: "Environmental Protection Agency (EPA)",
    description: "Commitment to environmental protection regulations enforced by Ghana's Environmental Protection Agency."
  }
];

export default function HSEPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                Health, Safety & Environment
              </h1>
              <p className="text-xl text-gray-200">
                Our commitment to protecting people and the environment in everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* HSE Policy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our HSE Policy</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  At PrimePillar Constructions, we are committed to achieving excellence in Health, Safety, and Environmental management in all our operations.
                </p>
              </div>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700">
                  PrimePillar Constructions Ltd maintains a comprehensive Health, Safety, and Environment (HSE) management system that 
                  reflects our core values and commitment to protecting the health and safety of our employees, contractors, clients, 
                  and the communities in which we operate. Our approach to HSE is proactive, preventive, and integrated into all aspects 
                  of our business operations.
                </p>
                
                <p className="text-gray-700 mt-4">
                  We recognize that all accidents and work-related ill-health are preventable, and we are committed to achieving our 
                  objective of Zero Harm through the elimination of hazards and the control of risks. This policy applies to all 
                  employees, contractors, suppliers, visitors, and anyone who may be affected by our activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitments */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our HSE Commitments</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Fundamental principles guiding our approach to health, safety, and environmental management.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {commitments.map((commitment, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-primary-500 mb-3">{commitment.title}</h3>
                    <p className="text-gray-700">{commitment.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Standards Compliance */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards Compliance</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We maintain compliance with national and international standards for health, safety, and environmental management.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {standards.map((standard, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{standard.title}</h3>
                    <p className="text-gray-700">{standard.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}