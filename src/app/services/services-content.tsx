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
              {services.map((service, serviceIndex) => {
                // Get the icon identifier for this service
                const iconId = iconMap[service.title] || "compass";
                // Get the actual component for this identifier
                const Icon = iconComponentMap[iconId as keyof typeof iconComponentMap] || Compass;
                
                return (
                  <Link 
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group"
                  >
                    {/* Service Image */}
                    {service.image_url ? (
                      <div 
                        className="mb-4 rounded-lg overflow-hidden h-48 cursor-pointer relative"
                        onClick={(e) => {
                          e.preventDefault();
                          openLightbox(serviceIndex);
                        }}
                      >
                        <Image 
                          src={service.image_url} 
                          alt={service.title} 
                          fill
                          className="object-cover hover:opacity-90 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="bg-black/50 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.short_description}</p>
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