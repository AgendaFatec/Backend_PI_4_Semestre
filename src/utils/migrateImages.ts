import fs from 'fs';
import path from 'path';
import { CloudinaryService } from '../services/storage/cloudinaryService.js';
import 'dotenv/config';

export async function migrateLocalImages() {
  const cloudinary = new CloudinaryService();
  const uploadsDir = path.join(process.cwd(), 'uploads');
  
  if (!fs.existsSync(uploadsDir)) return [];

  const files = fs.readdirSync(uploadsDir);
  const uploadedUrls: string[] = [];

  console.log(`found ${files.length} images to migrate...`);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(uploadsDir, file);
      const buffer = fs.readFileSync(filePath);
      
      try {
        console.log(`Uploading ${file}...`);
        const url = await cloudinary.uploadImage(buffer);
        uploadedUrls.push(url);
      } catch (err) {
        console.error(`Failed to upload ${file}:`, err);
      }
    }
  }

  return uploadedUrls;
}