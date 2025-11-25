import { Metadata } from "next";
import { createClient } from '@/lib/supabase/server';
import { ProjectsContent } from './projects-content';

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

export default async function ProjectsPage() {
  console.log('Projects page loading...');
  
  const supabase = await createClient();
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }
  
  console.log('Projects fetched:', projects?.length || 0);

  return (
    <ProjectsContent projects={projects || []} industries={industries} statuses={statuses} />
  );
}