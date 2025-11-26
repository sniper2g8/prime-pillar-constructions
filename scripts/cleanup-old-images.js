import fs from 'fs';
import path from 'path';

// Function to delete files matching a pattern in a directory
function deleteFilesMatchingPattern(dirPath, pattern) {
  try {
    const files = fs.readdirSync(dirPath);
    let deletedCount = 0;
    
    files.forEach((file) => {
      // Check if file matches the pattern
      if (pattern.test(file)) {
        const filePath = path.join(dirPath, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
        deletedCount++;
      }
    });
    
    console.log(`Deleted ${deletedCount} files in ${dirPath}`);
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Function to clean up old WhatsApp images
function cleanupOldImages() {
  console.log('Starting cleanup of old WhatsApp images...\n');
  
  // Pattern to match old WhatsApp image names
  const whatsappPattern = /^WhatsApp Image.*\.jpeg$/;
  
  // Clean up each directory
  deleteFilesMatchingPattern(
    path.join('./public/Architectural Works'), 
    whatsappPattern
  );
  
  deleteFilesMatchingPattern(
    path.join('./public/Construction'), 
    whatsappPattern
  );
  
  deleteFilesMatchingPattern(
    path.join('./public/Facility Maintenance'), 
    whatsappPattern
  );
  
  console.log('\nCleanup process completed!');
}

// Run the cleanup process
cleanupOldImages();
