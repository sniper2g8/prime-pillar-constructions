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

async function updateProjectGallery() {
  console.log('Updating project gallery images...')
  
  // Define gallery images for the Officers Residential Buildings project
  // Using multiple images from the Construction directory
  const projectGalleryMap: Record<string, string[]> = {
    "burma-camp-residential": [
      "/Construction/construction-01.jpeg",
      "/Construction/construction-02.jpeg",
      "/Construction/construction-03.jpeg",
      "/Construction/construction-04.jpeg",
      "/Construction/construction-05.jpeg",
      "/Construction/construction-06.jpeg"
    ]
  }

  // Update the Officers Residential Buildings project with gallery images
  const { error: updateError } = await supabase
    .from('projects')
    .update({ 
      gallery: projectGalleryMap["burma-camp-residential"]
    })
    .eq('slug', 'burma-camp-residential')

  if (updateError) {
    console.error('Error updating project gallery:', updateError)
  } else {
    console.log('Project gallery updated successfully!')
  }
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateProjectGallery().catch(console.error)
}

export { updateProjectGallery }