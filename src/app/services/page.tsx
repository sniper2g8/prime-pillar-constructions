import { Metadata } from "next";
import { createClient } from '@/lib/supabase/server';
import { ServicesContent } from './services-content';

export const metadata: Metadata = {
  title: 'Our Services | PrimePillar Constructions',
  description: 'Explore our comprehensive construction services including architectural works, building construction, electrical works, plumbing, equipment hiring, road construction, civil works, and facility maintenance.',
  openGraph: {
    title: 'Our Services | PrimePillar Constructions',
    description: 'Explore our comprehensive construction services including architectural works, building construction, electrical works, plumbing, equipment hiring, road construction, civil works, and facility maintenance.',
    url: 'https://www.primepillargh.com/services',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

// Map icons to service titles using string identifiers
const iconMap = {
  "Architectural Works": "compass",
  "Building & Construction": "building2",
  "Electrical Works": "zap",
  "Plumbing Works": "droplets",
  "Equipment Hiring": "truck",
  "Road Construction": "route",
  "Civil Works": "hardhat",
  "Facility Maintenance": "wrench"
};

export default async function ServicesPage() {
  const supabase = await createClient();
  
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error) {
    console.error('Error fetching services:', error);
  }

  return (
    <ServicesContent services={services || []} iconMap={iconMap} />
  );
}