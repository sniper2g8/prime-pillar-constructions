import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Our Projects | PrimePillar Constructions',
  description: 'Explore our portfolio of completed and ongoing construction projects across mining, oil & gas, energy, government, and infrastructure sectors.',
  openGraph: {
    title: 'Our Projects | PrimePillar Constructions',
    description: 'Explore our portfolio of completed and ongoing construction projects across mining, oil & gas, energy, government, and infrastructure sectors.',
    url: 'https://www.primepillargh.com/projects',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

// Mock data - in a real app, this would come from a database
const projects = [
  {
    id: 1,
    title: "Road Signs Construction",
    client: "TechnipFMC",
    industry: "oil_gas",
    year: 2017,
    status: "completed",
    shortDescription: "Design, fabrication, and installation of road signage for oil and gas facility operations.",
    thumbnail: "/placeholder.jpg"
  },
  {
    id: 2,
    title: "Site Signage Systems",
    client: "Heat Gold Fields (formerly FGR)",
    industry: "mining",
    year: 2016,
    status: "completed",
    shortDescription: "Comprehensive road signs and site signage systems for mining operations.",
    thumbnail: "/placeholder.jpg"
  },
  {
    id: 3,
    title: "Officers Residential Buildings",
    client: "Ghana Armed Forces",
    industry: "government",
    year: 2025,
    status: "ongoing",
    shortDescription: "Construction of 6-Unit 4-Bedroom residential buildings for officers at Burma Camp.",
    thumbnail: "/placeholder.jpg"
  }
];

const industries = [
  { id: "all", name: "All Projects" },
  { id: "mining", name: "Mining" },
  { id: "oil_gas", name: "Oil & Gas" },
  { id: "energy", name: "Energy" },
  { id: "government", name: "Government" },
  { id: "commercial", name: "Commercial" },
  { id: "infrastructure", name: "Infrastructure" }
];

const statuses = [
  { id: "all", name: "All Statuses" },
  { id: "completed", name: "Completed" },
  { id: "ongoing", name: "Ongoing" },
  { id: "upcoming", name: "Upcoming" }
];

export default function ProjectsPage() {
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
                    <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                        {project.industry.replace("_", " & ").replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <Link 
                        href={`/projects/${project.id}`}
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
    </div>
  );
}