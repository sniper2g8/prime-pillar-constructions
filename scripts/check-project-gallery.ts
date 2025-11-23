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

async function checkProjectGallery() {
  console.log('Checking project gallery data...')
  
  // Get the Officers Residential Buildings project
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', 'burma-camp-residential')
    .single();

  if (error) {
    console.error('Error fetching project:', error)
    return
  }

  if (!project) {
    console.log('Project not found')
    return
  }

  console.log(`Project: ${project.title}`)
  console.log(`Thumbnail: ${project.thumbnail_url || 'None'}`)
  console.log(`Gallery images: ${project.gallery ? project.gallery.length : 0}`)
  
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((image: string, index: number) => {
      console.log(`  ${index + 1}. ${image}`)
    })
  } else {
    console.log('  No gallery images found')
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkProjectGallery().catch(console.error)
}

export { checkProjectGallery }