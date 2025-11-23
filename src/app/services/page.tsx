import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { 
  Compass, 
  Building2, 
  Zap, 
  Droplets, 
  Truck, 
  Route, 
  HardHat, 
  Wrench 
} from "lucide-react";
import { Metadata } from "next";
import { createClient } from '@/lib/supabase/server';
import Image from "next/image";

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

// Map icons to service titles
const iconMap = {
  "Architectural Works": Compass,
  "Building & Construction": Building2,
  "Electrical Works": Zap,
  "Plumbing Works": Droplets,
  "Equipment Hiring": Truck,
  "Road Construction": Route,
  "Civil Works": HardHat,
  "Facility Maintenance": Wrench
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                Our Services
              </h1>
              <p className="text-xl text-gray-200">
                Comprehensive construction solutions tailored to meet the unique needs of various industries.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services && services.map((service) => {
                const Icon = iconMap[service.title as keyof typeof iconMap] || Compass;
                return (
                  <Link 
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group"
                  >
                    {/* Service Image */}
                    {service.image_url ? (
                      <div className="mb-4 rounded-lg overflow-hidden h-48">
                        <Image 
                          src={service.image_url} 
                          alt={service.title} 
                          width={300} 
                          height={200} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.short_description}</p>
                    <span className="text-primary-500 font-medium group-hover:text-primary-700 transition-colors duration-300">
                      Learn more →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}