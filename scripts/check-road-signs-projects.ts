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

async function checkRoadSignsProjects() {
  console.log('Checking road signs projects data...')
  
  // Get the Road Signs Construction project
  const { data: project1, error: error1 } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', 'technipfmc-road-signs')
    .single();

  if (error1) {
    console.error('Error fetching Road Signs Construction project:', error1)
  } else if (project1) {
    console.log(`Project: ${project1.title}`)
    console.log(`Thumbnail: ${project1.thumbnail_url || 'None'}`)
    console.log(`Gallery images: ${project1.gallery ? project1.gallery.length : 0}`)
    
    if (project1.gallery && project1.gallery.length > 0) {
      project1.gallery.forEach((image: string, index: number) => {
        console.log(`  ${index + 1}. ${image}`)
      })
    }
  }
  
  console.log('')
  
  // Get the Site Signage Systems project
  const { data: project2, error: error2 } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', 'heat-gold-fields-signage')
    .single();

  if (error2) {
    console.error('Error fetching Site Signage Systems project:', error2)
  } else if (project2) {
    console.log(`Project: ${project2.title}`)
    console.log(`Thumbnail: ${project2.thumbnail_url || 'None'}`)
    console.log(`Gallery images: ${project2.gallery ? project2.gallery.length : 0}`)
    
    if (project2.gallery && project2.gallery.length > 0) {
      project2.gallery.forEach((image: string, index: number) => {
        console.log(`  ${index + 1}. ${image}`)
      })
    }
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkRoadSignsProjects().catch(console.error)
}

export { checkRoadSignsProjects }