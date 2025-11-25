"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client';
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  year?: number;
  status: "completed" | "ongoing" | "upcoming";
  short_description: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(3);

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Loading featured projects...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our portfolio of successful construction projects across various industries.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {project.thumbnail_url ? (
                <div className="relative w-full h-56">
                  <Image 
                    src={project.thumbnail_url} 
                    alt={project.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed w-full h-56" />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{project.title}</h3>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    project.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : project.status === "ongoing" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-blue-100 text-blue-800"
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">Client: {project.client}</p>
                <p className="text-gray-600 mb-4">{project.short_description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {project.industry.replace("_", " & ").replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="text-primary-600 font-medium hover:text-primary-800 transition-colors flex items-center group"
                  >
                    View Details 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}