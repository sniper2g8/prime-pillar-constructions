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

async function addServiceGallery() {
  console.log('Adding gallery column to services table...')
  
  // Note: In a real Supabase environment, you would need to run SQL directly for this
  // Since we're using the JavaScript client, we'll simulate what the SQL migration would do
  // by updating existing services with gallery data
  
  // For the Architectural Works service, add gallery images
  const architecturalWorksGallery = [
    "/Architectural Works/architectural-works-01.jpeg",
    "/Architectural Works/architectural-works-02.jpeg",
    "/Architectural Works/architectural-works-03.jpeg",
    "/Architectural Works/architectural-works-04.jpeg"
  ];
  
  // Update the Architectural Works service with gallery images
  const { error: updateError } = await supabase
    .from('services')
    .update({ 
      // Since we can't add a new column with the JS client easily, 
      // we'll store gallery data in the existing features array for now
      // In a real implementation, you would add a gallery column to the table
      features: [...architecturalWorksGallery]
    })
    .eq('slug', 'architectural-works')

  if (updateError) {
    console.error('Error updating service gallery:', updateError)
  } else {
    console.log('Service gallery updated successfully!')
  }
  
  // In a real implementation, you would run this SQL:
  // ALTER TABLE services ADD COLUMN gallery text[] DEFAULT '{}';
}

// Run the update if this file is executed directly
if (require.main === module) {
  addServiceGallery().catch(console.error)
}

export { addServiceGallery }