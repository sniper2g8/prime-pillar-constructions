import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Service } from '../src/types/database'

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

async function updateServiceImages() {
  console.log('Updating service images...')
  
  // Define image mappings for the specific services you mentioned with renamed files
  const serviceImageMap: Record<string, string> = {
    "architectural-works": "/Architectural Works/architectural-works-01.jpeg",
    "building-construction": "/Construction/construction-04.jpeg",
    "facility-maintenance": "/Facility Maintenance/facility-maintenance-02.jpeg"
  }

  // Get all services
  const { data: services, error: fetchError } = await supabase
    .from('services')
    .select('*')

  if (fetchError) {
    console.error('Error fetching services:', fetchError)
    return
  }

  console.log(`Found ${services.length} services`)

  // Update only the specific services with their corresponding images
  for (const service of services) {
    // Only update the three services you specified
    if (service.slug === "architectural-works" || service.slug === "building-construction" || service.slug === "facility-maintenance") {
      const imageUrl = serviceImageMap[service.slug]
      
      if (imageUrl) {
        const { error: updateError } = await supabase
          .from('services')
          .update({ image_url: imageUrl })
          .eq('id', service.id)

        if (updateError) {
          console.error(`Error updating service ${service.title}:`, updateError)
        } else {
          console.log(`Updated ${service.title} with image: ${imageUrl}`)
        }
      }
    } else {
      console.log(`Skipping ${service.title} as it's not one of the specified services`)
    }
  }

  console.log('Service image update complete!')
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateServiceImages().catch(console.error)
}

export { updateServiceImages }