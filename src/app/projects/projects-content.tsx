"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ProjectsContent({ projects, industries, statuses }: { projects: any[]; industries: any[]; statuses: any[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Prepare slides for lightbox
  const slides = filteredProjects
    .filter(project => project.gallery && project.gallery.length > 0)
    .flatMap(project => 
      project.gallery.map((image: string) => ({
        src: image,
        alt: `${project.title} - Gallery Image`
      }))
    );

  const openLightbox = (projectIndex: number, imageIndex: number = 0) => {
    // Calculate the global index for the lightbox
    let globalIndex = 0;
    for (let i = 0; i < projectIndex; i++) {
      const project = filteredProjects[i];
      if (project.gallery && project.gallery.length > 0) {
        globalIndex += project.gallery.length;
      }
    }
    globalIndex += imageIndex;
    
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  };

  // Filter projects based on selected industry and status
  useEffect(() => {
    let result = projects;
    
    if (selectedIndustry !== "all") {
      result = result.filter(project => project.industry === selectedIndustry);
    }
    
    if (selectedStatus !== "all") {
      result = result.filter(project => project.status === selectedStatus);
    }
    
    setFilteredProjects(result);
  }, [selectedIndustry, selectedStatus, projects]);

  // Reset filters
  const resetFilters = () => {
    setSelectedIndustry("all");
    setSelectedStatus("all");
  };

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
                Our Projects Portfolio
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover our comprehensive portfolio of successful construction projects across diverse industries
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link 
                  href="#projects" 
                  className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  View Projects
                </Link>
              </motion.div>
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
                <div className="text-3xl md:text-4xl font-bold text-primary-600">{projects.length}+</div>
                <div className="text-gray-600 mt-2">Projects Completed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">
                  {projects.filter(p => p.industry === "mining").length}+
                </div>
                <div className="text-gray-600 mt-2">Mining Projects</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">
                  {projects.filter(p => p.industry === "oil_gas").length}+
                </div>
                <div className="text-gray-600 mt-2">Oil & Gas Projects</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">
                  {new Set(projects.map(p => p.client)).size}+
                </div>
                <div className="text-gray-600 mt-2">Happy Clients</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Filter Projects</h2>
                <p className="text-gray-600 mt-1">Browse our projects by industry or status</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    id="industry"
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 w-full md:w-auto"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    {industries.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 w-full md:w-auto"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {(selectedIndustry !== "all" || selectedStatus !== "all") && (
                  <div className="flex items-end">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900">No projects found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your filters to see more projects.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedIndustry === "all" && selectedStatus === "all" 
                      ? "All Projects" 
                      : `${selectedIndustry !== "all" ? industries.find(i => i.id === selectedIndustry)?.name : "All Industries"} - ${selectedStatus !== "all" ? statuses.find(s => s.id === selectedStatus)?.name : "All Statuses"}`}
                  </h2>
                  <p className="text-gray-600">
                    Showing {filteredProjects.length} of {projects.length} projects
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, projectIndex) => (
                    <motion.div 
                      key={project.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: projectIndex * 0.1 }}
                    >
                      {/* Project Image */}
                      {project.thumbnail_url ? (
                        <div 
                          className="relative w-full h-56 cursor-pointer group"
                          onClick={() => openLightbox(projectIndex)}
                        >
                          <Image 
                            src={project.thumbnail_url} 
                            alt={project.title} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              project.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : project.status === "ongoing" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-blue-100 text-blue-800"
                            }`}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed w-full h-56" />
                      )}
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-2 text-sm">Client: {project.client}</p>
                        <p className="text-gray-700 mb-4 text-sm line-clamp-2">{project.short_description}</p>
                        
                        {/* Gallery Preview */}
                        {project.gallery && project.gallery.length > 0 && (
                          <div className="mb-4">
                            <div className="flex -space-x-2">
                              {project.gallery.slice(0, 4).map((image: string, idx: number) => (
                                <div 
                                  key={idx} 
                                  className="relative w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                                  onClick={() => openLightbox(projectIndex, idx)}
                                >
                                  <Image 
                                    src={image} 
                                    alt={`${project.title} - Image ${idx + 1}`} 
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                </div>
                              ))}
                              {project.gallery.length > 4 && (
                                <div className="relative w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">+{project.gallery.length - 4}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {project.industry.replace("_", " & ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </span>
                          <Link 
                            href={`/projects/${project.slug}`}
                            className="text-primary-600 font-medium hover:text-primary-800 transition-colors text-sm flex items-center"
                          >
                            View Details 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </div>
  );
}