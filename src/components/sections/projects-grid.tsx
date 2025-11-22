"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client';

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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Loading featured projects...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful construction projects across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
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
                    className="text-primary-500 font-medium hover:text-primary-700 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}