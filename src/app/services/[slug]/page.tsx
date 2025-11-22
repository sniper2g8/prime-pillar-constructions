import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// Mock data - in a real app, this would come from a database
const servicesData = [
  {
    slug: "architectural-works",
    title: "Architectural Works",
    description: "Our architectural services encompass the complete design process from initial concept through to detailed construction drawings. We work closely with clients to understand their vision and translate it into functional, aesthetically pleasing spaces that meet all regulatory requirements.",
    features: [
      "Conceptual design and visualization",
      "Detailed architectural drawings",
      "Building permit documentation",
      "3D modeling and rendering",
      "Interior design consultation",
      "Sustainable design solutions"
    ]
  },
  {
    slug: "building-construction",
    title: "Building & Construction",
    description: "From residential homes to commercial complexes, we deliver high-quality building projects with precision and care. Our experienced team manages every aspect of construction, ensuring adherence to timelines, budgets, and quality standards.",
    features: [
      "Residential construction",
      "Commercial building projects",
      "Industrial facilities",
      "Renovation and remodeling",
      "Project management",
      "Quality assurance and control"
    ]
  },
  {
    slug: "electrical-works",
    title: "Electrical Works",
    description: "Our electrical division provides comprehensive installation, maintenance, and repair services for residential, commercial, and industrial facilities. We ensure all electrical systems are safe, efficient, and compliant with national standards.",
    features: [
      "Electrical installation and wiring",
      "Lighting design and installation",
      "Power distribution systems",
      "Emergency backup systems",
      "Electrical maintenance and repairs",
      "Energy efficiency solutions"
    ]
  },
  {
    slug: "plumbing-works",
    title: "Plumbing Works",
    description: "We offer complete plumbing solutions including installation, maintenance, and repair of water supply, drainage, and sewage systems. Our plumbers use the latest techniques and materials to ensure reliable, leak-free installations.",
    features: [
      "Water supply systems",
      "Drainage and sewage systems",
      "Heating and cooling systems",
      "Pipe fitting and repair",
      "Fixture installation",
      "Leak detection and repair"
    ]
  },
  {
    slug: "equipment-hiring",
    title: "Equipment Hiring",
    description: "Access our fleet of well-maintained construction equipment for your projects. We offer competitive rates and technical support to ensure optimal performance and safety during your rental period.",
    features: [
      "Excavators and bulldozers",
      "Concrete mixers and vibrators",
      "Power tools and generators",
      "Scaffolding and lifting equipment",
      "Safety equipment",
      "Technical support and training"
    ]
  },
  {
    slug: "road-construction",
    title: "Road Construction",
    description: "Specializing in the construction and rehabilitation of roads, driveways, and access roads for various sectors. Our road construction services ensure durable, safe transportation infrastructure.",
    features: [
      "Road design and planning",
      "Earthwork and grading",
      "Asphalt and concrete paving",
      "Drainage systems",
      "Road markings and signage",
      "Maintenance and rehabilitation"
    ]
  },
  {
    slug: "civil-works",
    title: "Civil Works",
    description: "Our civil engineering expertise covers a wide range of infrastructure projects including earthworks, foundations, retaining walls, and site preparation. We deliver robust solutions that stand the test of time.",
    features: [
      "Site preparation and excavation",
      "Foundation construction",
      "Retaining wall construction",
      "Drainage systems",
      "Earthworks and grading",
      "Structural engineering support"
    ]
  },
  {
    slug: "facility-maintenance",
    title: "Facility Maintenance",
    description: "Keep your facilities in optimal condition with our comprehensive maintenance services. We provide scheduled and emergency maintenance for buildings, electrical systems, and plumbing installations.",
    features: [
      "Preventive maintenance programs",
      "Emergency repair services",
      "Building maintenance",
      "Electrical system maintenance",
      "Plumbing system maintenance",
      "HVAC system servicing"
    ]
  }
];

// Mock projects data - in a real app, this would be filtered by service
const projects = [
  {
    id: 1,
    title: "Road Signs Construction",
    client: "TechnipFMC",
    industry: "oil_gas",
    thumbnail: "/placeholder.jpg"
  },
  {
    id: 2,
    title: "Site Signage Systems",
    client: "Heat Gold Fields",
    industry: "mining",
    thumbnail: "/placeholder.jpg"
  }
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData.find(s => s.slug === params.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | PrimePillar Constructions',
      description: 'The requested service could not be found.'
    };
  }

  return {
    title: `${service.title} | PrimePillar Constructions`,
    description: service.description,
    openGraph: {
      title: `${service.title} | PrimePillar Constructions`,
      description: service.description,
      url: `https://www.primepillargh.com/services/${params.slug}`,
      siteName: 'PrimePillar Constructions',
      locale: 'en_GH',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                {service?.title}
              </h1>
              <p className="text-xl text-gray-200">
                Specialized construction services tailored to your project needs.
              </p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 text-lg">
                  {service?.description}
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services Include:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service?.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">Client: {project.client}</p>
                        <Link 
                          href={`/projects/${project.id}`}
                          className="text-primary-500 font-medium hover:text-primary-700 transition-colors"
                        >
                          View Project Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your project?</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Contact us today for a free consultation and customized quote for your construction needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact" 
                    className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                  <Link 
                    href="/quote" 
                    className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}