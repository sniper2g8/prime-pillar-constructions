"use client";

import { useState } from "react";
import { 
  Pickaxe, 
  Fuel, 
  Zap as EnergyIcon, 
  Factory, 
  Building 
} from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  {
    id: "mining",
    name: "Mining",
    icon: Pickaxe,
    description: "Specialized construction services for mining operations, including site preparation, infrastructure development, and facility construction."
  },
  {
    id: "oil_gas",
    name: "Oil & Gas",
    icon: Fuel,
    description: "Comprehensive construction solutions for petroleum facilities, pipelines, and offshore structures."
  },
  {
    id: "energy",
    name: "Energy",
    icon: EnergyIcon,
    description: "Renewable and conventional energy project construction, including solar farms, wind facilities, and power plants."
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    description: "Manufacturing facility construction, warehouse development, and industrial infrastructure projects."
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: Building,
    description: "Public works projects including roads, bridges, government buildings, and municipal facilities."
  }
];

export function Industries() {
  const [activeIndustry, setActiveIndustry] = useState("mining");

  const activeIndustryData = industries.find(industry => industry.id === activeIndustry);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Specialized construction expertise across diverse sectors throughout Ghana and West Africa.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeIndustry === industry.id
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{industry.name}</span>
              </motion.button>
            );
          })}
        </div>

        {activeIndustryData && (
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <activeIndustryData.icon className="w-14 h-14 text-primary-600" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeIndustryData.name}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{activeIndustryData.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}