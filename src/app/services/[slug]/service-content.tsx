"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { motion } from "framer-motion";

// Define the Service type
type Service = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  features: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
  gallery?: string[];
};

// Define the Project type
interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: 'mining' | 'oil_gas' | 'energy' | 'government' | 'commercial' | 'infrastructure';
  location?: string;
  year?: number;
  status: 'completed' | 'ongoing' | 'upcoming';
  short_description: string;
  full_description?: string;
  scope?: string;
  featured: boolean;
  thumbnail_url?: string;
  gallery: string[];
  created_at: string;
  updated_at: string;
}

// Client component for interactive features
export function ServiceContent({ 
  service,
  projects = [],
  imagePaths = [],
  nonImageFeatures = []
}: { 
  service: Service;
  projects?: Project[];
  imagePaths?: string[];
  nonImageFeatures?: string[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prepare slides for lightbox
  const slides = imagePaths && imagePaths.length > 0 
    ? imagePaths.map((image: string) => ({
        src: image,
        alt: `${service.title} - Gallery Image`
      }))
    : service.gallery?.map((image: string) => ({
        src: image,
        alt: `${service.title} - Gallery Image`
      })) || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  href="/services" 
                  className="inline-flex items-center text-gray-200 hover:text-white mb-4"
                >
                  ← Back to Services
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl">
                  {service.short_description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Gallery */}
              <div className="mb-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  Service Gallery
                </motion.h2>
                
                {imagePaths && imagePaths.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {imagePaths.map((image: string, index: number) => (
                      <motion.div 
                        key={index} 
                        className="relative rounded-xl overflow-hidden w-full h-64 cursor-pointer group"
                        onClick={() => openLightbox(index)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Image 
                          src={image} 
                          alt={`${service.title} - Image ${index + 1}`} 
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
                      </motion.div>
                    ))}
                  </div>
                ) : service.gallery && service.gallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {service.gallery.map((image: string, index: number) => (
                      <motion.div 
                        key={index} 
                        className="relative rounded-xl overflow-hidden w-full h-64 cursor-pointer group"
                        onClick={() => openLightbox(index)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Image 
                          src={image} 
                          alt={`${service.title} - Image ${index + 1}`} 
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
                      </motion.div>
                    ))}
                  </div>
                ) : service.image_url ? (
                  <div className="relative rounded-xl overflow-hidden w-full h-96 mb-4 cursor-pointer group" onClick={() => openLightbox(0)}>
                    <Image 
                      src={service.image_url} 
                      alt={service.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <motion.div 
                className="prose prose-lg max-w-none mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {service.full_description}
                </p>
              </motion.div>

              {/* Features */}
              {nonImageFeatures && nonImageFeatures.length > 0 && (
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nonImageFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div 
                className="text-center py-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                  Contact us today to discuss how we can help with your {service.title.toLowerCase()} needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/quote" 
                    className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Request a Quote
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Contact Us
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
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