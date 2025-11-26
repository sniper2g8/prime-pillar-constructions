"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteForm } from "@/components/forms/quote-form";
import { Metadata } from "next";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: 'Request a Quote | PrimePillar Constructions',
  description: 'Request a customized quote for your construction project. Provide details about your requirements and we will get back to you with a competitive proposal.',
  openGraph: {
    title: 'Request a Quote | PrimePillar Constructions',
    description: 'Request a customized quote for your construction project. Provide details about your requirements and we will get back to you with a competitive proposal.',
    url: 'https://www.primepillargh.com/quote',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function QuotePage() {
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
                Request a Quote
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Get a customized quote for your construction project. Provide details about your requirements and we will get back to you with a competitive proposal.
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
                <div className="text-3xl md:text-4xl font-bold text-primary-600">24</div>
                <div className="text-gray-600 mt-2">Hour Response</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">98%</div>
                <div className="text-gray-600 mt-2">Satisfaction Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">50+</div>
                <div className="text-gray-600 mt-2">Projects Quoted</div>
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

        {/* Quote Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                <QuoteForm />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}