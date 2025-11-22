import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// Mock data - in a real app, this would come from a database
const projectsData = [
  {
    id: "1",
    title: "Road Signs Construction",
    client: "TechnipFMC",
    industry: "oil_gas",
    location: "Tema, Ghana",
    year: 2017,
    status: "completed",
    shortDescription: "Design, fabrication, and installation of road signage for oil and gas facility operations.",
    fullDescription: "This project involved the comprehensive design, fabrication, and installation of road signage systems for TechnipFMC's oil and gas facility operations. The signage systems were designed to meet international safety standards and enhance operational efficiency within the facility.",
    scope: "Road signage systems for facility operations including design, fabrication, and installation of over 200 custom signage units.",
    gallery: ["/placeholder.jpg", "/placeholder2.jpg", "/placeholder3.jpg"]
  },
  {
    id: "2",
    title: "Site Signage Systems",
    client: "Heat Gold Fields (formerly FGR)",
    industry: "mining",
    location: "Obuasi, Ghana",
    year: 2016,
    status: "completed",
    shortDescription: "Comprehensive road signs and site signage systems for mining operations.",
    fullDescription: "We designed and installed a complete signage system for Heat Gold Fields' mining operations. The project included directional signs, safety warnings, regulatory signage, and informational boards to ensure safe and efficient operations across the mining site.",
    scope: "Design, fabrication, and installation of signage covering 15km of roads and operational areas within the mining site.",
    gallery: ["/placeholder.jpg", "/placeholder2.jpg", "/placeholder3.jpg"]
  },
  {
    id: "3",
    title: "Officers Residential Buildings",
    client: "Ghana Armed Forces",
    industry: "government",
    location: "Burma Camp, Accra",
    year: 2025,
    status: "ongoing",
    shortDescription: "Construction of 6-Unit 4-Bedroom residential buildings for officers at Burma Camp.",
    fullDescription: "This ongoing project involves the construction of six 4-bedroom residential buildings for senior officers of the Ghana Armed Forces at Burma Camp. Each unit features modern amenities, secure parking, and landscaped surroundings.",
    scope: "Project supervision and construction management for six residential buildings with a total floor area of 3,600 square meters.",
    gallery: ["/placeholder.jpg", "/placeholder2.jpg", "/placeholder3.jpg"]
  }
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projectsData.find(p => p.id === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | PrimePillar Constructions',
      description: 'The requested project could not be found.'
    };
  }

  return {
    title: `${project.title} | PrimePillar Constructions`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | PrimePillar Constructions`,
      description: project.shortDescription,
      url: `https://www.primepillargh.com/projects/${params.slug}`,
      siteName: 'PrimePillar Constructions',
      locale: 'en_GH',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find(p => p.id === params.slug);

  if (!project) {
    notFound();
  }

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
                {project?.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {project?.client}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {project?.industry.replace("_", " & ").replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {project?.year}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  project?.status === "completed" 
                    ? "bg-green-500/80" 
                    : project?.status === "ongoing" 
                      ? "bg-yellow-500/80" 
                      : "bg-blue-500/80"
                }`}>
                  {project?.status.charAt(0).toUpperCase() + project?.status.slice(1)}
                </span>
              </div>
              <p className="text-xl text-gray-200 max-w-3xl">
                {project?.shortDescription}
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
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Client</h3>
                  <p className="text-gray-700">{project?.client}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700">{project?.location}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Year</h3>
                  <p className="text-gray-700">{project?.year}</p>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700">
                  {project?.fullDescription}
                </p>
              </div>

              {/* Scope */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope of Work</h2>
                <p className="text-gray-700">
                  {project?.scope}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}