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
      <section className="py-20 bg-white">
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
    <section className="py-20 bg-white">
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
            Explore our portfolio of successful construction projects.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {project.thumbnail_url ? (
                <div className="relative w-full h-48">
                  <Image 
                    src={project.thumbnail_url} 
                    alt={project.title} 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gold-600 transition-colors">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    project.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : project.status === "ongoing" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-blue-100 text-blue-800"
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Client: {project.client}</p>
                <p className="text-gray-600 text-sm mb-4">{project.short_description}</p>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="text-gold-600 font-medium hover:text-gold-700 transition-colors text-sm inline-flex items-center group"
                >
                  View Details 
                  <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}