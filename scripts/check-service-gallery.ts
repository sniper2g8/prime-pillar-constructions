import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env file
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set in environment variables')
}

if (!supabaseServiceRole) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables')
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceRole)

async function checkServiceGallery() {
  console.log('Checking service gallery data...')
  
  // Get the Architectural Works service
  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', 'architectural-works')
    .single();

  if (error) {
    console.error('Error fetching service:', error)
    return
  }

  if (!service) {
    console.log('Service not found')
    return
  }

  console.log(`Service: ${service.title}`)
  console.log(`Image URL: ${service.image_url || 'None'}`)
  console.log(`Features count: ${service.features ? service.features.length : 0}`)
  
  if (service.features && service.features.length > 0) {
    console.log('Features:');
    service.features.forEach((feature: string, index: number) => {
      console.log(`  ${index + 1}. ${feature}`)
    })
  } else {
    console.log('  No features found')
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkServiceGallery().catch(console.error)
}

export { checkServiceGallery }