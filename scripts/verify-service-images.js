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

async function verifyServiceImages() {
  console.log('Verifying service images...');
  
  // Get all services
  const { data: services, error: fetchError } = await supabase
    .from('services')
    .select('title, image_url');

  if (fetchError) {
    console.error('Error fetching services:', fetchError);
    return;
  }

  console.log(`Found ${services.length} services`);
  console.log('Services with images:');
  
  services.forEach(service => {
    console.log(`  ${service.title}: ${service.image_url}`);
  });
}

// Run the verification
verifyServiceImages().catch(console.error);