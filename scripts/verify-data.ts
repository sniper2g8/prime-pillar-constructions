import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env file
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRole) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceRole)

async function verifyData() {
  console.log('Verifying data in Supabase database...')
  
  // Check services
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*')
    .order('display_order')
  
  if (servicesError) {
    console.error('Error fetching services:', servicesError)
  } else {
    console.log(`\nServices (${services.length} found):`)
    services.forEach(service => {
      console.log(`- ${service.title} (${service.slug})`)
    })
  }
  
  // Check for specific services from the prompt
  const { data: promptServices, error: promptServicesError } = await supabase
    .from('services')
    .select('title, slug')
    .in('slug', ['architectural-works', 'building-construction', 'electrical-works'])
  
  if (promptServicesError) {
    console.error('Error fetching prompt services:', promptServicesError)
  } else {
    console.log(`\nPrompt Services Found (${promptServices.length} found):`)
    promptServices.forEach(service => {
      console.log(`- ${service.title} (${service.slug})`)
    })
  }
  
  // Check projects
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at')
  
  if (projectsError) {
    console.error('Error fetching projects:', projectsError)
  } else {
    console.log(`\nProjects (${projects.length} found):`)
    projects.forEach(project => {
      console.log(`- ${project.title} (${project.slug}) - ${project.client}`)
    })
  }
  
  // Check for specific projects from the prompt
  const { data: promptProjects, error: promptProjectsError } = await supabase
    .from('projects')
    .select('title, slug, client')
    .in('slug', ['technipfmc-road-signs', 'heat-gold-fields-signage', 'burma-camp-residential'])
  
  if (promptProjectsError) {
    console.error('Error fetching prompt projects:', promptProjectsError)
  } else {
    console.log(`\nPrompt Projects Found (${promptProjects.length} found):`)
    promptProjects.forEach(project => {
      console.log(`- ${project.title} (${project.slug}) - ${project.client}`)
    })
  }
  
  // Check equipment
  const { data: equipment, error: equipmentError } = await supabase
    .from('equipment')
    .select('*')
    .order('name')
  
  if (equipmentError) {
    console.error('Error fetching equipment:', equipmentError)
  } else {
    console.log(`\nEquipment (${equipment.length} found):`)
    equipment.forEach(item => {
      console.log(`- ${item.name} (${item.category}) - Quantity: ${item.quantity}`)
    })
  }
  
  // Check for specific equipment from the prompt
  const { data: promptEquipment, error: promptEquipmentError } = await supabase
    .from('equipment')
    .select('name, category, quantity')
    .in('name', ['Poker Vibrator', 'Concrete Mixer', 'Compactor'])
  
  if (promptEquipmentError) {
    console.error('Error fetching prompt equipment:', promptEquipmentError)
  } else {
    console.log(`\nPrompt Equipment Found (${promptEquipment.length} found):`)
    promptEquipment.forEach(item => {
      console.log(`- ${item.name} (${item.category}) - Quantity: ${item.quantity}`)
    })
  }
  
  // Check team members
  const { data: teamMembers, error: teamError } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order')
  
  if (teamError) {
    console.error('Error fetching team members:', teamError)
  } else {
    console.log(`\nTeam Members (${teamMembers.length} found):`)
    teamMembers.forEach(member => {
      console.log(`- ${member.name} (${member.role})`)
    })
  }
  
  // Check for specific team members from the prompt
  const { data: promptTeam, error: promptTeamError } = await supabase
    .from('team_members')
    .select('name, role')
    .in('name', ['Smaila Shaibu Mensah', 'Nana Osei Yaw'])
  
  if (promptTeamError) {
    console.error('Error fetching prompt team members:', promptTeamError)
  } else {
    console.log(`\nPrompt Team Members Found (${promptTeam.length} found):`)
    promptTeam.forEach(member => {
      console.log(`- ${member.name} (${member.role})`)
    })
  }
}

// Run verification
verifyData().catch(console.error)