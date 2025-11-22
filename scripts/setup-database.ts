import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Service, Project, Equipment, TeamMember } from '../src/types/database'

// Load environment variables from .env file
dotenv.config()

// Load environment variables
console.log('Loading environment variables...')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET')

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

async function setupDatabase() {
  console.log('Setting up database...')
  console.log('Supabase URL:', supabaseUrl)
  
  // Seed initial data
  await seedData()
  
  console.log('Database setup complete!')
}

async function seedData() {
  console.log('Seeding initial data...')
  
  // Seed services - REAL DATA FROM PROMPT
  const services: Omit<Service, 'id' | 'created_at'>[] = [
    {
      title: "Architectural Works",
      slug: "architectural-works",
      icon: "Compass",
      short_description: "Comprehensive architectural design services from conceptualization to detailed drawings.",
      features: [],
      display_order: 1,
      is_active: true
    },
    {
      title: "Building & Construction",
      slug: "building-construction",
      icon: "Building2",
      short_description: "Residential, commercial, and industrial building projects from foundation to finishing.",
      features: [],
      display_order: 2,
      is_active: true
    },
    {
      title: "Electrical Works",
      slug: "electrical-works",
      icon: "Zap",
      short_description: "Complete electrical installation, power distribution, and maintenance services.",
      features: [],
      display_order: 3,
      is_active: true
    },
    {
      title: "Plumbing Works",
      slug: "plumbing-works",
      icon: "Droplets",
      short_description: "Installation and maintenance of water supply, drainage, and sewage systems.",
      features: [],
      display_order: 4,
      is_active: true
    },
    {
      title: "Equipment Hiring",
      slug: "equipment-hiring",
      icon: "Truck",
      short_description: "Wide range of construction equipment available for hire with technical support.",
      features: [],
      display_order: 5,
      is_active: true
    },
    {
      title: "Road Construction",
      slug: "road-construction",
      icon: "Route",
      short_description: "Building and rehabilitation of roads, driveways, and access roads.",
      features: [],
      display_order: 6,
      is_active: true
    },
    {
      title: "Civil Works",
      slug: "civil-works",
      icon: "HardHat",
      short_description: "Earthworks, drainage systems, foundations, retaining walls, and site preparation.",
      features: [],
      display_order: 7,
      is_active: true
    },
    {
      title: "Facility Maintenance",
      slug: "facility-maintenance",
      icon: "Wrench",
      short_description: "Ongoing maintenance services for buildings, electrical, and plumbing systems.",
      features: [],
      display_order: 8,
      is_active: true
    }
  ]
  
  // Insert services
  const { error: servicesInsertError } = await supabase
    .from('services')
    .insert(services)
  
  if (servicesInsertError) {
    console.error('Error inserting services:', servicesInsertError)
  } else {
    console.log('Services seeded successfully')
  }
  
  // Seed team members - REAL DATA FROM PROMPT
  const teamMembers: Omit<TeamMember, 'id' | 'created_at'>[] = [
    {
      name: "Smaila Shaibu Mensah",
      role: "Co-Founder & Director",
      title: "Director",
      bio: "Brings a unique blend of technological innovation and practical construction knowledge. Expertise in integrating modern technology with construction processes ensures efficiency and precision in project delivery.",
      qualifications: "B.Tech in Computer Science and Engineering, PCTE Institute of Engineering and Technology, Ludhiana, India",
      experience: "Over 10 years providing architectural services and road signage solutions for oil and gas industry and mining sector. Successfully delivered projects for TechnipFMC and Heat Gold Fields.",
      is_director: true,
      display_order: 1,
      image_url: "/Smaila.jpg"
    },
    {
      name: "Nana Osei Yaw",
      role: "Co-Founder & Director",
      title: "Director",
      bio: "Applies strong analytical and problem-solving skills to project planning, cost estimation, and quality assurance. Mathematical precision ensures every project is executed with accuracy and excellence.",
      qualifications: "BSc in Mathematics, Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana",
      experience: "Over 5 years hands-on experience in construction industry. Currently serving as Project Supervisor on Ghana Armed Forces Burma Camp residential buildings project (subcontract for Desimone Ltd).",
      is_director: true,
      display_order: 2
    }
  ]
  
  // Insert team members
  const { error: teamInsertError } = await supabase
    .from('team_members')
    .insert(teamMembers)
  
  if (teamInsertError) {
    console.error('Error inserting team members:', teamInsertError)
  } else {
    console.log('Team members seeded successfully')
  }
  
  // Seed equipment - REAL DATA FROM PROMPT
  const equipment: Omit<Equipment, 'id' | 'created_at'>[] = [
    {
      name: "Poker Vibrator",
      category: "Concrete Equipment",
      quantity: 15,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Concrete Mixer",
      category: "Concrete Equipment",
      quantity: 1,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Compactor",
      category: "Earth Moving",
      quantity: 4,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Jack Hammer",
      category: "Demolition",
      quantity: 4,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Angle Grinder",
      category: "Power Tools",
      quantity: 5,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Drilling Machine",
      category: "Power Tools",
      quantity: 2,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Head Pan",
      category: "Manual Tools",
      quantity: 20,
      description: "",
      specifications: {},
      is_available: true
    },
    {
      name: "Safety Equipment (PPE Sets)",
      category: "Safety",
      quantity: 50,
      description: "",
      specifications: {},
      is_available: true
    }
  ]
  
  // Insert equipment
  const { error: equipmentInsertError } = await supabase
    .from('equipment')
    .insert(equipment)
  
  if (equipmentInsertError) {
    console.error('Error inserting equipment:', equipmentInsertError)
  } else {
    console.log('Equipment seeded successfully')
  }
  
  // Seed projects - REAL DATA FROM PROMPT
  const projects: Omit<Project, 'id' | 'created_at' | 'updated_at'>[] = [
    {
      title: "Road Signs Construction",
      slug: "technipfmc-road-signs",
      client: "TechnipFMC",
      industry: "oil_gas",
      location: "",
      year: 2017,
      status: "completed",
      short_description: "Design, fabrication, and installation of road signage for oil and gas facility operations.",
      full_description: "",
      scope: "Road signage systems for facility operations",
      featured: true,
      gallery: []
    },
    {
      title: "Site Signage Systems",
      slug: "heat-gold-fields-signage",
      client: "Heat Gold Fields (formerly FGR)",
      industry: "mining",
      location: "",
      year: 2016,
      status: "completed",
      short_description: "Comprehensive road signs and site signage systems for mining operations.",
      full_description: "",
      scope: "Design, fabrication, and installation of signage",
      featured: true,
      gallery: []
    },
    {
      title: "Officers Residential Buildings",
      slug: "burma-camp-residential",
      client: "Ghana Armed Forces",
      industry: "government",
      location: "",
      year: 2025,
      status: "ongoing",
      short_description: "Construction of 6-Unit 4-Bedroom residential buildings for officers at Burma Camp.",
      full_description: "",
      scope: "Project supervision and construction management",
      featured: true,
      gallery: []
    }
  ]
  
  // Insert projects
  const { error: projectsInsertError } = await supabase
    .from('projects')
    .insert(projects)
  
  if (projectsInsertError) {
    console.error('Error inserting projects:', projectsInsertError)
  } else {
    console.log('Projects seeded successfully')
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase().catch(console.error)
}

export { setupDatabase }