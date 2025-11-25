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
        {/* Simplified overlay for better text readability */}
        <div className="absolute inset-0 bg-primary-900/70"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Building Legacies <br className="hidden sm:block" />With Precision
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Specialized construction services for mining, petroleum, oil & gas, energy, industrial, and public infrastructure sectors across Ghana and West Africa.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/services" 
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg text-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Our Services
            </Link>
            <Link 
              href="/quote" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Simplified scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-gray-200">Explore our work</span>
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center p-1">
            <motion.div 
              className="w-1 h-1 bg-white rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}