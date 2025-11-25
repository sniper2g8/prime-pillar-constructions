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

async function updateRoadSignsProjects() {
  console.log('Updating road signs projects with new images...')
  
  // Update Road Signs Construction project
  const { error: updateError1 } = await supabase
    .from('projects')
    .update({ 
      thumbnail_url: '/Road signs/road-signs-01.jpg',
      gallery: [
        '/Road signs/road-signs-01.jpg',
        '/Road signs/road-signs-02.jpg',
        '/Road signs/road-signs-03.jpg'
      ]
    })
    .eq('slug', 'technipfmc-road-signs')

  if (updateError1) {
    console.error('Error updating Road Signs Construction project:', updateError1)
  } else {
    console.log('Road Signs Construction project updated successfully!')
  }
  
  // Update Site Signage Systems project
  const { error: updateError2 } = await supabase
    .from('projects')
    .update({ 
      thumbnail_url: '/Road signs/road-signs-02.jpg',
      gallery: [
        '/Road signs/road-signs-01.jpg',
        '/Road signs/road-signs-02.jpg',
        '/Road signs/road-signs-03.jpg'
      ]
    })
    .eq('slug', 'heat-gold-fields-signage')

  if (updateError2) {
    console.error('Error updating Site Signage Systems project:', updateError2)
  } else {
    console.log('Site Signage Systems project updated successfully!')
  }
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateRoadSignsProjects().catch(console.error)
}

export { updateRoadSignsProjects }