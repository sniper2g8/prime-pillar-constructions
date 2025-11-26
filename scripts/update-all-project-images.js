import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set in environment variables');
}

if (!supabaseServiceRole) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables');
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceRole);

// Function to get all image files from a directory
function getAllImagesFromDir(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
      })
      .map(file => `/${path.basename(dirPath)}/${file}`);
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

async function updateAllProjectImages() {
  console.log('Updating all project images with comprehensive galleries...');
  
  // Get all images from each directory
  const architecturalWorksImages = getAllImagesFromDir('./public/Architectural Works');
  const constructionImages = getAllImagesFromDir('./public/Construction');
  const facilityMaintenanceImages = getAllImagesFromDir('./public/Facility Maintenance');
  const realEstateImages = getAllImagesFromDir('./public/Real Estate Development');
  const roadSignsImages = getAllImagesFromDir('./public/Road signs');
  const siteSignagesImages = getAllImagesFromDir('./public/Site signages');
  
  // Combine all images
  const allImages = [
    ...architecturalWorksImages,
    ...constructionImages,
    ...facilityMaintenanceImages,
    ...realEstateImages,
    ...roadSignsImages,
    ...siteSignagesImages
  ];
  
  console.log(`Found ${allImages.length} images across all directories`);
  
  // Get all projects
  const { data: projects, error: fetchError } = await supabase
    .from('projects')
    .select('*');

  if (fetchError) {
    console.error('Error fetching projects:', fetchError);
    return;
  }

  console.log(`Found ${projects.length} projects`);
  
  // Update each project with a comprehensive gallery
  for (const project of projects) {
    // Select a thumbnail based on project slug
    let thumbnail = '/hero.jpg'; // default
    let gallery = [...allImages]; // Use all images for gallery
    
    // Customize thumbnails based on project
    if (project.slug.includes('road-signs') || project.slug.includes('signage')) {
      thumbnail = roadSignsImages[0] || '/hero.jpg';
      gallery = [...roadSignsImages, ...siteSignagesImages];
    } else if (project.slug.includes('residential') || project.slug.includes('construction')) {
      thumbnail = constructionImages[0] || '/hero.jpg';
      gallery = [...constructionImages, ...realEstateImages];
    }
    
    // Ensure we have at least 3 images in gallery
    while (gallery.length < 3) {
      gallery.push('/hero.jpg');
    }
    
    // Limit gallery to 9 images for better performance
    gallery = gallery.slice(0, 9);
    
    const { error: updateError } = await supabase
      .from('projects')
      .update({ 
        thumbnail_url: thumbnail,
        gallery: gallery
      })
      .eq('id', project.id);

    if (updateError) {
      console.error(`Error updating project ${project.title}:`, updateError);
    } else {
      console.log(`Updated ${project.title}`);
      console.log(`  Thumbnail: ${thumbnail}`);
      console.log(`  Gallery (${gallery.length} images): ${gallery.slice(0, 3).join(', ')}${gallery.length > 3 ? '...' : ''}`);
    }
  }

  console.log('All project images updated successfully!');
}

// Run the update
updateAllProjectImages().catch(console.error);