"use client";

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

export function ServicesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to meet the unique needs of various industries.
          </p>
        </div>
        
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
  );
}