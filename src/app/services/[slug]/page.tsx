import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import Image from "next/image";

// Define the Service type
type Service = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  features: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
};

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

// Define type for generateStaticParams
type ServiceSlug = {
  slug: string;
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Unwrap the params promise
  const params = await props.params;
  
  const supabase = await createClient();
  
  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !service) {
    return {
      title: 'Service Not Found | PrimePillar Constructions',
      description: 'The requested service could not be found.'
    };
  }

  return {
    title: `${service.title} | PrimePillar Constructions`,
    description: service.short_description,
    openGraph: {
      title: `${service.title} | PrimePillar Constructions`,
      description: service.short_description,
      url: `https://www.primepillargh.com/services/${params.slug}`,
      siteName: 'PrimePillar Constructions',
      locale: 'en_GH',
      type: 'website',
    },
  };
}

// Remove generateStaticParams for now to avoid the cookies issue
// We'll rely on dynamic rendering instead

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  // Unwrap the params promise
  const params = await props.params;
  
  const supabase = await createClient();
  
  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !service) {
    notFound();
  }

  // Fetch related projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .limit(2);

  // Check if any features are actually image paths (for gallery display)
  const imagePaths = service.features.filter((feature: string) => 
    feature.startsWith('/Architectural Works/') || 
    feature.startsWith('/Construction/') || 
    feature.startsWith('/Facility Maintenance/')
  );

  const nonImageFeatures = service.features.filter((feature: string) => !imagePaths.includes(feature));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link 
                href="/services" 
                className="inline-flex items-center text-gray-200 hover:text-white mb-4"
              >
                ← Back to Services
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-200">
                Specialized construction services tailored to your project needs.
              </p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Service Image */}
              {service.image_url && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image 
                    src={service.image_url} 
                    alt={service.title} 
                    width={800} 
                    height={400} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Gallery for Architectural Works */}
              {imagePaths.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePaths.map((image: string, index: number) => (
                      <div key={index} className="relative rounded-lg overflow-hidden aspect-square">
                        <Image 
                          src={image} 
                          alt={`${service.title} - Image ${index + 1}`} 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 text-lg">
                  {service.short_description}
                </p>
                {service.full_description && (
                  <div className="mt-6">
                    {service.full_description.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>

              {nonImageFeatures.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services Include:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nonImageFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                        </div>
                        <p className="text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {projects && projects.length > 0 && (
                <div className="border-t border-gray-200 pt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project: Project) => (
                      <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden">
                        {project.thumbnail_url ? (
                          <Image 
                            src={project.thumbnail_url} 
                            alt={project.title} 
                            width={400} 
                            height={200} 
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">Client: {project.client}</p>
                          <Link 
                            href={`/projects/${project.slug}`}
                            className="text-primary-500 font-medium hover:text-primary-700 transition-colors"
                          >
                            View Project Details →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your project?</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Contact us today for a free consultation and customized quote for your construction needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact" 
                    className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                  <Link 
                    href="/quote" 
                    className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}