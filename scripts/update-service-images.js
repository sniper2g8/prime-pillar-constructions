import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set in environment variables');
}

if (!supabaseServiceRole) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables');
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceRole);

async function updateServiceImages() {
  console.log('Updating service images...');
  
  // Define image mappings for each service
  const serviceImageMap = {
    "Architectural Works": "/Architectural Works/architectural-works-01.jpeg",
    "Building & Construction": "/Construction/construction-04.jpeg",
    "Electrical Works": "/Facility Maintenance/facility-maintenance-01.jpeg",
    "Plumbing Works": "/Facility Maintenance/facility-maintenance-02.jpeg",
    "Equipment Hiring": "/Equipment hiring/Tractor-Backhoe.jpg",
    "Road Construction": "/Road signs/road-signs-01.jpg",
    "Civil Works": "/Construction/construction-08.jpeg",
    "Facility Maintenance": "/Facility Maintenance/facility-maintenance-03.jpeg"
  };

  // Get all services
  const { data: services, error: fetchError } = await supabase
    .from('services')
    .select('*');

  if (fetchError) {
    console.error('Error fetching services:', fetchError);
    return;
  }

  console.log(`Found ${services.length} services`);

  // Update each service with its corresponding image
  for (const service of services) {
    const imageUrl = serviceImageMap[service.title];
    
    if (imageUrl) {
      const { error: updateError } = await supabase
        .from('services')
        .update({ 
          image_url: imageUrl
        })
        .eq('id', service.id);

      if (updateError) {
        console.error(`Error updating service ${service.title}:`, updateError);
      } else {
        console.log(`Updated ${service.title} with image: ${imageUrl}`);
      }
    } else {
      console.log(`No image found for service: ${service.title}`);
    }
  }

  console.log('Service image update complete!');
}

// Run the update
updateServiceImages().catch(console.error);