"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { motion } from "framer-motion";

// Real data from the prompt
const equipment = [
  {
    id: "poker-vibrator",
    name: "Poker Vibrator",
    category: "Concrete Equipment",
    quantity: 15,
    isAvailable: true
  },
  {
    id: "concrete-mixer",
    name: "Concrete Mixer",
    category: "Concrete Equipment",
    quantity: 1,
    isAvailable: true
  },
  {
    id: "compactor",
    name: "Compactor",
    category: "Earth Moving",
    quantity: 4,
    isAvailable: true
  },
  {
    id: "jack-hammer",
    name: "Jack Hammer",
    category: "Demolition",
    quantity: 4,
    isAvailable: true
  },
  {
    id: "angle-grinder",
    name: "Angle Grinder",
    category: "Power Tools",
    quantity: 5,
    isAvailable: true
  },
  {
    id: "drilling-machine",
    name: "Drilling Machine",
    category: "Power Tools",
    quantity: 2,
    isAvailable: true
  },
  {
    id: "head-pan",
    name: "Head Pan",
    category: "Manual Tools",
    quantity: 20,
    isAvailable: true
  },
  {
    id: "safety-equipment",
    name: "Safety Equipment (PPE Sets)",
    category: "Safety",
    quantity: 50,
    isAvailable: true
  }
];

// Group equipment by category
const groupEquipmentByCategory = (equipmentList: typeof equipment) => {
  return equipmentList.reduce((acc: Record<string, typeof equipment>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};

export default function EquipmentClientPage() {
  const equipmentByCategory = groupEquipmentByCategory(equipment);

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
                Equipment Catalog
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Wide range of construction equipment available for hire with technical support
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
                <div className="text-3xl md:text-4xl font-bold text-primary-600">8+</div>
                <div className="text-gray-600 mt-2">Equipment Types</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">100+</div>
                <div className="text-gray-600 mt-2">Units Available</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">24/7</div>
                <div className="text-gray-600 mt-2">Technical Support</div>
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

        {/* Equipment List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Equipment Inventory</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our comprehensive catalog of construction equipment available for hire
              </p>
            </div>

            {/* Equipment by Category */}
            <div className="space-y-16">
              {Object.entries(equipmentByCategory).map(([category, items], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-primary-200 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            item.isAvailable 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {item.isAvailable ? "Available" : "Not Available"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></span>
                          <Link 
                            href="/contact" 
                            className="text-primary-600 hover:text-primary-800 font-medium text-sm inline-flex items-center"
                          >
                            Inquire
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div 
              className="mt-20 text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 border border-primary-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Specific Equipment?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                Can't find what you're looking for? Contact us and we'll help you source the right equipment for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/quote" 
                  className="inline-flex items-center px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Request a Quote
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}