"use client";

import { useState } from "react";
import { 
  Pickaxe, 
  Fuel, 
  Zap as EnergyIcon, 
  Factory, 
  Building 
} from "lucide-react";

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized construction expertise across diverse sectors throughout Ghana and West Africa.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors duration-300 ${
                  activeIndustry === industry.id
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{industry.name}</span>
              </button>
            );
          })}
        </div>

        {activeIndustryData && (
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <activeIndustryData.icon className="w-12 h-12 text-primary-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeIndustryData.name}</h3>
                <p className="text-gray-600">{activeIndustryData.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}