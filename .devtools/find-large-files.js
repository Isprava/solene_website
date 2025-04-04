import fs from 'fs';
import path from 'path';
import glob from 'glob';

const folderPath = '../src/public'; // Path to the public folder
const sizeLimit = 101 * 1024; // 200KB in bytes

// Function to get the size of a file
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Function to find large files
function findLargeFiles(folderPath, sizeLimit) {
  const files = glob.sync(`${folderPath}/**/*`, { nodir: true }); // Get all files
  const largeFiles = files.filter((file) => getFileSize(file) > sizeLimit);

  return largeFiles;
}

// Find and log large files
const largeFiles = findLargeFiles(folderPath, sizeLimit);

if (largeFiles.length > 0) {
  console.log('Files larger than 101KB:');
  largeFiles.forEach((file) => {
    const sizeInKB = (getFileSize(file) / 1024).toFixed(2);
    const ext = path.extname(file).toLowerCase();

    // Log file details
    if (ext !== '.webp') {
      console.log(`❌ ${file} - ${sizeInKB} KB (Not WebP)`);
    } else {
      console.log(`✅ ${file} - ${sizeInKB} KB`);
    }
  });
} else {
  console.log('No files larger than 200KB found.');
}