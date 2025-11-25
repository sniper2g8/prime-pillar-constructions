"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export function ProjectsContent({ projects, industries, statuses }: { projects: any[]; industries: any[]; statuses: any[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prepare slides for lightbox
  const slides = projects
    .filter(project => project.thumbnail_url)
    .map(project => ({
      src: project.thumbnail_url,
      alt: project.title
    }));

  const openLightbox = (projectIndex: number) => {
    // Find the index in the filtered slides array
    const slideIndex = projects
      .filter(project => project.thumbnail_url)
      .findIndex((_, index) => index === projectIndex);
    
    if (slideIndex !== -1) {
      setLightboxIndex(slideIndex);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                Our Projects
              </h1>
              <p className="text-xl text-gray-200">
                Explore our portfolio of successful construction projects across various industries.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, projectIndex) => (
                <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Project Image */}
                  {project.thumbnail_url ? (
                    <div 
                      className="relative w-full h-48 cursor-pointer"
                      onClick={() => openLightbox(projectIndex)}
                    >
                      <Image 
                        src={project.thumbnail_url} 
                        alt={project.title} 
                        fill
                        className="object-cover hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                  )}
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
                        {project.industry.replace("_", " & ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
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