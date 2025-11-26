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
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/80"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 relative z-10">
        <div className="max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Building Excellence <br className="hidden sm:block" />Across Ghana
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Delivering premium construction services across Ghana and West Africa with precision, quality, and innovation. 
            From architectural design to civil works, we build the future.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/projects" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Our Projects
            </Link>
            <Link 
              href="/quote" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Stats bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-400">50+</div>
              <div className="text-gray-300 text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-400">15+</div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-400">200+</div>
              <div className="text-gray-300 text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-400">8+</div>
              <div className="text-gray-300 text-sm">Services Offered</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}