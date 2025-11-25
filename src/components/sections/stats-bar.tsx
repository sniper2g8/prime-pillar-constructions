"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function StatsBar() {
  const stats = [
    { value: 10, label: "Years Experience" },
    { value: 50, label: "Projects Completed" },
    { value: 5, label: "Industries" },
    { value: 0, label: "Safety Incidents" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-2">
                {stat.value}+
              </div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}