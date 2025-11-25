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
import { motion } from "framer-motion";

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive construction solutions tailored to meet your unique needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  href={`/services/${service.slug}`}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group h-full flex flex-col border border-gray-200 hover:border-gold-300"
                >
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold-600 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-gold-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>
                  <span className="text-gold-600 font-medium group-hover:text-gold-700 transition-colors duration-200 text-sm inline-flex items-center">
                    Learn more 
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}