import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env file
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set in environment variables')
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in environment variables')
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testProjectsFetch() {
  console.log('Testing projects fetch...')
  
  // Get all projects
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')

  if (error) {
    console.error('Error fetching projects:', error)
    return
  }

  console.log(`Found ${projects.length} projects`)
  
  // Display project information
  for (const project of projects) {
    console.log(`\nProject: ${project.title}`)
    console.log(`  Slug: ${project.slug}`)
    console.log(`  Client: ${project.client}`)
    console.log(`  Thumbnail URL: ${project.thumbnail_url}`)
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testProjectsFetch().catch(console.error)
}

export { testProjectsFetch }