import { Project, Service, Equipment, Inquiry, TeamMember, Testimonial } from '@/types/database'

/**
 * Database setup and utility functions for PrimePillar Constructions
 * This file contains type definitions and setup functions for the Supabase database
 */

export function initializeDatabaseTypes() {
  // This function initializes the database types
  console.log('Database types initialized')
}

// Type guard functions for database entities
export function isProject(item: any): item is Project {
  return item && typeof item === 'object' && 'title' in item && 'slug' in item && 'client' in item
}

export function isService(item: any): item is Service {
  return item && typeof item === 'object' && 'title' in item && 'slug' in item && 'icon' in item
}

export function isEquipment(item: any): item is Equipment {
  return item && typeof item === 'object' && 'name' in item && 'quantity' in item
}

export function isTeamMember(item: any): item is TeamMember {
  return item && typeof item === 'object' && 'name' in item && 'role' in item
}