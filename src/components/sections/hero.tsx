"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Construction site"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-primary-700/80"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Solid Pillars, Lasting Legacy
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Specializing in construction services for mining, petroleum, oil & gas, energy, industrial, and public infrastructure sectors across Ghana and West Africa.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href="/services" 
              className="bg-white text-primary-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-center transition-colors duration-300"
            >
              Our Services
            </Link>
            <Link 
              href="/quote" 
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg text-center transition-colors duration-300"
            >
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}