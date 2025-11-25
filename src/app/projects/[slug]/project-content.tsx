"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

// Define the Project type
type Project = {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: 'mining' | 'oil_gas' | 'energy' | 'government' | 'commercial' | 'infrastructure';
  location?: string;
  year?: number;
  status: 'completed' | 'ongoing' | 'upcoming';
  short_description: string;
  full_description?: string;
  scope?: string;
  featured: boolean;
  thumbnail_url?: string;
  gallery: string[];
  created_at: string;
  updated_at: string;
};

// Client component for interactive features
export function ProjectContent({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prepare slides for lightbox
  const slides = project.gallery?.map((image: string) => ({
    src: image,
    alt: `${project.title} - Gallery Image`
  })) || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link 
                href="/projects" 
                className="inline-flex items-center text-gray-200 hover:text-white mb-4"
              >
                ← Back to Projects
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {project.client}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {project.industry.replace("_", " & ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </span>
                {project.year && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    {project.year}
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === "completed" 
                    ? "bg-green-500/80" 
                    : project.status === "ongoing" 
                      ? "bg-yellow-500/80" 
                      : "bg-blue-500/80"
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              <p className="text-xl text-gray-200 max-w-3xl">
                {project.short_description}
              </p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Gallery */}
              <div className="mb-12">
                {project.thumbnail_url ? (
                  <div className="relative w-full h-96 mb-4 rounded-xl overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
                    <Image 
                      src={project.thumbnail_url} 
                      alt={project.title} 
                      fill
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 mb-4" />
                )}
                {project.gallery && project.gallery.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {project.gallery.map((image: string, index: number) => (
                      <div 
                        key={index} 
                        className="relative rounded-xl overflow-hidden w-full h-32 cursor-pointer"
                        onClick={() => openLightbox(index)}
                      >
                        <Image 
                          src={image} 
                          alt={`${project.title} - Image ${index + 1}`} 
                          fill
                          className="object-cover hover:opacity-90 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="bg-black/50 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Client</h3>
                  <p className="text-gray-700">{project.client}</p>
                </div>
                {project.location && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{project.location}</p>
                  </div>
                )}
                {project.year && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Year</h3>
                    <p className="text-gray-700">{project.year}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700">
                  {project.full_description || project.short_description}
                </p>
              </div>

              {/* Scope */}
              {project.scope && (
                <div className="prose prose-lg max-w-none mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope of Work</h2>
                  <p className="text-gray-700">
                    {project.scope}
                  </p>
                </div>
              )}
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