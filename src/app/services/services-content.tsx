"use client";

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
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { motion } from "framer-motion";

// Map icon identifiers to actual components
const iconComponentMap = {
  "compass": Compass,
  "building2": Building2,
  "zap": Zap,
  "droplets": Droplets,
  "truck": Truck,
  "route": Route,
  "hardhat": HardHat,
  "wrench": Wrench
};

export function ServicesContent({ services, iconMap }: { services: any[]; iconMap: any }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prepare slides for lightbox
  const slides = services
    .filter(service => service.image_url)
    .map(service => ({
      src: service.image_url,
      alt: service.title
    }));

  const openLightbox = (serviceIndex: number) => {
    // Find the index in the filtered slides array
    const slideIndex = services
      .filter(service => service.image_url)
      .findIndex((_, index) => index === serviceIndex);
    
    if (slideIndex !== -1) {
      setLightboxIndex(slideIndex);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-28">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Services
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Comprehensive construction solutions tailored to meet the unique needs of various industries
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Intro */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                Construction Excellence Across Industries
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                We provide specialized construction services designed to deliver exceptional results for clients in mining, oil & gas, energy, government, and commercial sectors.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, serviceIndex) => {
                // Get the icon identifier for this service
                const iconId = iconMap[service.title] || "compass";
                // Get the actual component for this identifier
                const Icon = iconComponentMap[iconId as keyof typeof iconComponentMap] || Compass;
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: serviceIndex * 0.1 }}
                  >
                    <Link 
                      href={`/services/${service.slug}`}
                      className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-primary-200"
                    >
                      {/* Service Image */}
                      {service.image_url ? (
                        <div 
                          className="mb-4 rounded-lg overflow-hidden h-48 cursor-pointer relative group-hover:shadow-lg transition-all duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            openLightbox(serviceIndex);
                          }}
                        >
                          <Image 
                            src={service.image_url} 
                            alt={service.title} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300 mx-auto">
                          <Icon className="w-8 h-8 text-primary-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{service.title}</h3>
                      <p className="text-gray-600 mb-4 text-center">{service.short_description}</p>
                      <div className="text-center">
                        <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-300 inline-flex items-center">
                          Learn more 
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </div>
  );
}