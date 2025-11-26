"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

const commitments = [
  {
    title: "Zero Harm Objective",
    description: "Our unwavering commitment to ensuring that no worker, contractor, or member of the public is harmed as a result of our operations."
  },
  {
    title: "Risk Assessment",
    description: "Comprehensive risk assessments are conducted for all activities to identify and mitigate potential hazards before work begins."
  },
  {
    title: "Training and Competency",
    description: "All personnel receive appropriate HSE training relevant to their roles and responsibilities, with regular refresher sessions."
  },
  {
    title: "Personal Protective Equipment",
    description: "We provide appropriate personal protective equipment to all workers and ensure its proper use at all times."
  },
  {
    title: "Incident Reporting",
    description: "A robust incident reporting system encourages the reporting of all incidents, near misses, and hazards without fear of reprisal."
  },
  {
    title: "Continuous Improvement",
    description: "Regular reviews of our HSE performance inform continuous improvement initiatives to enhance safety outcomes."
  }
];

const standards = [
  {
    title: "OHSAS/ISO 45001",
    description: "Adherence to international occupational health and safety management system standards."
  },
  {
    title: "Minerals Commission",
    description: "Compliance with regulations and guidelines set by Ghana's Minerals Commission for mining operations."
  },
  {
    title: "Petroleum Commission",
    description: "Alignment with safety and environmental standards established by Ghana's Petroleum Commission."
  },
  {
    title: "Environmental Protection Agency (EPA)",
    description: "Commitment to environmental protection regulations enforced by Ghana's Environmental Protection Agency."
  }
];

export default function HSEClientPage() {
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
                Health, Safety & Environment
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our commitment to protecting people and the environment in everything we do
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
                <div className="text-3xl md:text-4xl font-bold text-primary-600">0</div>
                <div className="text-gray-600 mt-2">Safety Incidents</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">100%</div>
                <div className="text-gray-600 mt-2">Compliance</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">24/7</div>
                <div className="text-gray-600 mt-2">Monitoring</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">15+</div>
                <div className="text-gray-600 mt-2">Years Experience</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HSE Policy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our HSE Policy</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  At PrimePillar Constructions, we are committed to achieving excellence in Health, Safety, and Environmental management in all our operations.
                </p>
              </motion.div>

              <motion.div 
                className="prose prose-lg max-w-none mb-12 bg-gray-50 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  PrimePillar Constructions Ltd maintains a comprehensive Health, Safety, and Environment (HSE) management system that 
                  reflects our core values and commitment to protecting the health and safety of our employees, contractors, clients, 
                  and the communities in which we operate. Our approach to HSE is proactive, preventive, and integrated into all aspects 
                  of our business operations.
                </p>
                
                <p className="text-gray-700 mt-6 text-lg leading-relaxed">
                  We recognize that all accidents and work-related ill-health are preventable, and we are committed to achieving our 
                  objective of Zero Harm through the elimination of hazards and the control of risks. This policy applies to all 
                  employees, contractors, suppliers, visitors, and anyone who may be affected by our activities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Commitments */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our HSE Commitments</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Fundamental principles guiding our approach to health, safety, and environmental management.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {commitments.map((commitment, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold text-primary-600 mb-3">{commitment.title}</h3>
                    <p className="text-gray-700">{commitment.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Standards Compliance */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards Compliance</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  We maintain compliance with national and international standards for health, safety, and environmental management.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {standards.map((standard, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{standard.title}</h3>
                    <p className="text-gray-700">{standard.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}