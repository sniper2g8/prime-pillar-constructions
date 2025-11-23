import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Service, Project } from '../src/types/database'

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

async function checkCurrentState() {
  console.log('Checking current state of services and projects...')
  
  // Get all services with their current image URLs
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*')
    .order('display_order')

  if (servicesError) {
    console.error('Error fetching services:', servicesError)
    return
  }

  console.log(`\nServices:`)
  services.forEach(service => {
    const hasImage = service.image_url ? 'YES' : 'NO';
    console.log(`${service.display_order}. ${service.title} (${service.slug}) - Image: ${hasImage}`)
    if (service.image_url) {
      console.log(`   Image URL: ${service.image_url}`)
    }
  })

  // Get all projects with their current thumbnail URLs
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })

  if (projectsError) {
    console.error('Error fetching projects:', projectsError)
    return
  }

  console.log(`\nProjects:`)
  projects.forEach(project => {
    const hasThumbnail = project.thumbnail_url ? 'YES' : 'NO';
    console.log(`${project.year}. ${project.title} (${project.slug}) - Thumbnail: ${hasThumbnail}`)
    if (project.thumbnail_url) {
      console.log(`   Thumbnail URL: ${project.thumbnail_url}`)
    }
  })

  console.log('\nCurrent state check complete!')
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkCurrentState().catch(console.error)
}

export { checkCurrentState }