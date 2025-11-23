import fs from 'fs';
import path from 'path';

// Function to rename images in a directory
function renameImagesInDirectory(dirPath: string, prefix: string) {
  try {
    const files = fs.readdirSync(dirPath);
    console.log(`Found ${files.length} files in ${dirPath}`);
    
    files.forEach((file, index) => {
      // Only process JPEG files
      if (file.endsWith('.jpeg')) {
        const oldPath = path.join(dirPath, file);
        // Create new filename with prefix and sequential numbering
        const newIndex = index + 1;
        const newFilename = `${prefix}-${newIndex.toString().padStart(2, '0')}.jpeg`;
        const newPath = path.join(dirPath, newFilename);
        
        // Rename the file
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} → ${newFilename}`);
      }
    });
    
    console.log(`Completed renaming in ${dirPath}\n`);
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Function to process all directories
function renameAllImages() {
  console.log('Starting image renaming process...\n');
  
  // Rename images in each directory
  renameImagesInDirectory(
    path.join(__dirname, '../public/Architectural Works'), 
    'architectural-works'
  );
  
  renameImagesInDirectory(
    path.join(__dirname, '../public/Construction'), 
    'construction'
  );
  
  renameImagesInDirectory(
    path.join(__dirname, '../public/Facility Maintenance'), 
    'facility-maintenance'
  );
  
  console.log('Image renaming process completed!');
}

// Run the renaming process if this file is executed directly
if (require.main === module) {
  renameAllImages();
}

export { renameAllImages };