import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from '@/lib/supabase/server';
import { ServiceContent } from './service-content';

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
    feature.startsWith('/Facility Maintenance/') ||
    feature.startsWith('/Road signs/')
  );

  const nonImageFeatures = service.features.filter((feature: string) => !imagePaths.includes(feature));

  return (
    <ServiceContent 
      service={service} 
      projects={projects || []} 
      imagePaths={imagePaths} 
      nonImageFeatures={nonImageFeatures} 
    />
  );
}