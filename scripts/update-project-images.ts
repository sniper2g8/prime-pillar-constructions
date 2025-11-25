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
  
  // Define image mappings for each project with images from the correct directories
  const projectImageMap: Record<string, { thumbnail: string; gallery: string[] }> = {
    "technipfmc-road-signs": {
      thumbnail: "/Road signs/road-signs-01.jpg",
      gallery: [
        "/Road signs/road-signs-01.jpg",
        "/Road signs/road-signs-02.jpg",
        "/Road signs/road-signs-03.jpg"
      ]
    },
    "heat-gold-fields-signage": {
      thumbnail: "/Road signs/road-signs-02.jpg",
      gallery: [
        "/Road signs/road-signs-02.jpg",
        "/Road signs/road-signs-01.jpg",
        "/Road signs/road-signs-03.jpg"
      ]
    },
    "burma-camp-residential": {
      thumbnail: "/Construction/construction-04.jpeg",
      gallery: [
        "/Construction/construction-04.jpeg",
        "/Construction/construction-01.jpeg",
        "/Construction/construction-02.jpeg"
      ]
    }
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

  // Update each project with its corresponding images
  for (const project of projects) {
    const imageConfig = projectImageMap[project.slug]
    
    if (imageConfig) {
      const { error: updateError } = await supabase
        .from('projects')
        .update({ 
          thumbnail_url: imageConfig.thumbnail,
          gallery: imageConfig.gallery
        })
        .eq('id', project.id)

      if (updateError) {
        console.error(`Error updating project ${project.title}:`, updateError)
      } else {
        console.log(`Updated ${project.title}`)
        console.log(`  Thumbnail: ${imageConfig.thumbnail}`)
        console.log(`  Gallery: ${imageConfig.gallery.join(', ')}`)
      }
    } else {
      console.log(`No image configuration found for project: ${project.title}`)
    }
  }

  console.log('Project image update complete!')
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateProjectImages().catch(console.error)
}

export { updateProjectImages }