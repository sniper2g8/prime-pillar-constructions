import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from '@/lib/supabase/server';
import { ProjectContent } from './project-content';

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
  
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !project) {
    return {
      title: 'Project Not Found | PrimePillar Constructions',
      description: 'The requested project could not be found.'
    };
  }

  return {
    title: `${project.title} | PrimePillar Constructions`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | PrimePillar Constructions`,
      description: project.short_description,
      url: `https://www.primepillargh.com/projects/${params.slug}`,
      siteName: 'PrimePillar Constructions',
      locale: 'en_GH',
      type: 'website',
    },
  };
}

// Remove generateStaticParams to avoid cookies context issues
// We'll rely on dynamic rendering instead

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  // Unwrap the params promise
  const params = await props.params;
  
  const supabase = await createClient();
  
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <ProjectContent project={project} />
  );
}