"use client";

import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TeamWithoutHeading } from "@/components/sections/team";
import { motion } from "framer-motion";

export default function AboutClientPage() {
  const values = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our dealings and commitments."
    },
    {
      title: "Excellence",
      description: "We strive for perfection in every project, delivering quality that exceeds expectations."
    },
    {
      title: "Safety",
      description: "We prioritize the well-being of our team, clients, and communities above all else."
    },
    {
      title: "Innovation",
      description: "We embrace cutting-edge technologies and methodologies to drive construction excellence."
    },
    {
      title: "Sustainability",
      description: "We build with environmental responsibility and long-term community impact in mind."
    },
    {
      title: "Collaboration",
      description: "We work hand-in-hand with clients, partners, and stakeholders for shared success."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative text-white py-20 md:py-28">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/about_us.jpg"
              alt="About PrimePillar Constructions"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-800/80"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About PrimePillar Constructions
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Building the foundations of Ghana's infrastructure development with integrity, excellence, and innovation
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">15+</div>
                <div className="text-gray-600 mt-2">Years Experience</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">50+</div>
                <div className="text-gray-600 mt-2">Projects Completed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">200+</div>
                <div className="text-gray-600 mt-2">Happy Clients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">100%</div>
                <div className="text-gray-600 mt-2">Local Content</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Side by Side with Image */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision & Mission</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover what drives us forward and defines our purpose
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Image */}
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/about_us.jpg"
                    alt="Our Vision and Mission"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary-500">
                    <h3 className="text-xl font-bold text-primary-600 mb-3">Our Vision</h3>
                    <p className="text-gray-700">
                      To be the leading construction company in West Africa, recognized for excellence in delivering 
                      innovative, sustainable, and high-quality construction solutions that contribute to the region's 
                      economic development and infrastructure growth.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-accent-500">
                    <h3 className="text-xl font-bold text-primary-600 mb-3">Our Mission</h3>
                    <p className="text-gray-700">
                      To provide exceptional construction services through innovative solutions, skilled workforce, 
                      and cutting-edge technology, while maintaining the highest standards of safety, quality, and 
                      environmental responsibility in all our projects.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                The principles that guide our operations and define our corporate culture
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-primary-600 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Directors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Meet the visionary directors leading PrimePillar Constructions towards excellence
              </p>
            </motion.div>
            
            <TeamWithoutHeading />
          </div>
        </section>

        {/* Capacity Statement */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Capacity</h2>
              <p className="text-xl text-gray-200 mb-8">
                With over 10 years of experience in the construction industry, PrimePillar Constructions has 
                successfully delivered projects for major clients in the mining, oil & gas, and government sectors. 
                Our team combines technical expertise with practical knowledge to deliver projects on time and within budget.
              </p>
              <motion.div 
                className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4">Local Content Commitment</h3>
                <p className="text-gray-200">
                  As a 100% Ghanaian-owned company, we are committed to maximizing local participation in all our projects. 
                  We prioritize hiring local talent, sourcing materials locally, and partnering with Ghanaian businesses 
                  to contribute to the economic development of our communities.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}