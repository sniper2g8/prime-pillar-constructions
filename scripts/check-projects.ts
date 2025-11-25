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

async function checkProjects() {
  console.log('Checking project data...')
  
  // Get all projects
  const { data: projects, error: fetchError } = await supabase
    .from('projects')
    .select('*')

  if (fetchError) {
    console.error('Error fetching projects:', fetchError)
    return
  }

  console.log(`Found ${projects.length} projects`)
  
  // Display project information
  for (const project of projects) {
    console.log(`\nProject: ${project.title}`)
    console.log(`  Slug: ${project.slug}`)
    console.log(`  Client: ${project.client}`)
    console.log(`  Industry: ${project.industry}`)
    console.log(`  Status: ${project.status}`)
    console.log(`  Thumbnail URL: ${project.thumbnail_url}`)
    console.log(`  Gallery: ${project.gallery ? project.gallery.join(', ') : 'None'}`)
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkProjects().catch(console.error)
}

export { checkProjects }