import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Project } from '../src/types/database'

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

async function updateProjectImages() {
  console.log('Updating project images...')
  
  // Define image mappings for each project with renamed files
  const projectImageMap: Record<string, string> = {
    "technipfmc-road-signs": "/Construction/construction-16.jpeg",
    "heat-gold-fields-signage": "/Construction/construction-08.jpeg",
    "burma-camp-residential": "/Construction/construction-04.jpeg"
  }

  // Get all projects
  const { data: projects, error: fetchError } = await supabase
    .from('projects')
    .select('*')

  if (fetchError) {
    console.error('Error fetching projects:', fetchError)
    return
  }

  console.log(`Found ${projects.length} projects`)

  // Update each project with its corresponding image
  for (const project of projects) {
    const imageUrl = projectImageMap[project.slug]
    
    if (imageUrl) {
      const { error: updateError } = await supabase
        .from('projects')
        .update({ thumbnail_url: imageUrl })
        .eq('id', project.id)

      if (updateError) {
        console.error(`Error updating project ${project.title}:`, updateError)
      } else {
        console.log(`Updated ${project.title} with image: ${imageUrl}`)
      }
    } else {
      console.log(`No image found for project: ${project.title}`)
    }
  }

  console.log('Project image update complete!')
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateProjectImages().catch(console.error)
}

export { updateProjectImages }