import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { 
  Compass, 
  Building2, 
  Zap, 
  Droplets, 
  Truck, 
  Route, 
  HardHat, 
  Wrench 
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Our Services | PrimePillar Constructions',
  description: 'Explore our comprehensive construction services including architectural works, building construction, electrical works, plumbing, equipment hiring, road construction, civil works, and facility maintenance.',
  openGraph: {
    title: 'Our Services | PrimePillar Constructions',
    description: 'Explore our comprehensive construction services including architectural works, building construction, electrical works, plumbing, equipment hiring, road construction, civil works, and facility maintenance.',
    url: 'https://www.primepillargh.com/services',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

const services = [
  {
    title: "Architectural Works",
    description: "Comprehensive architectural design services from conceptualization to detailed drawings.",
    icon: Compass,
    slug: "architectural-works"
  },
  {
    title: "Building & Construction",
    description: "Residential, commercial, and industrial building projects from foundation to finishing.",
    icon: Building2,
    slug: "building-construction"
  },
  {
    title: "Electrical Works",
    description: "Complete electrical installation, power distribution, and maintenance services.",
    icon: Zap,
    slug: "electrical-works"
  },
  {
    title: "Plumbing Works",
    description: "Installation and maintenance of water supply, drainage, and sewage systems.",
    icon: Droplets,
    slug: "plumbing-works"
  },
  {
    title: "Equipment Hiring",
    description: "Wide range of construction equipment available for hire with technical support.",
    icon: Truck,
    slug: "equipment-hiring"
  },
  {
    title: "Road Construction",
    description: "Building and rehabilitation of roads, driveways, and access roads.",
    icon: Route,
    slug: "road-construction"
  },
  {
    title: "Civil Works",
    description: "Earthworks, drainage systems, foundations, retaining walls, and site preparation.",
    icon: HardHat,
    slug: "civil-works"
  },
  {
    title: "Facility Maintenance",
    description: "Ongoing maintenance services for buildings, electrical, and plumbing systems.",
    icon: Wrench,
    slug: "facility-maintenance"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                Our Services
              </h1>
              <p className="text-xl text-gray-200">
                Comprehensive construction solutions tailored to meet the unique needs of various industries.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link 
                    key={index}
                    href={`/services/${service.slug}`}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <span className="text-primary-500 font-medium group-hover:text-primary-700 transition-colors duration-300">
                      Learn more →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}