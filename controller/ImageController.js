import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";
import multer from "multer";
import ImageModel from '../model/ImageModel.js';

dotenv.config({
    path : ".env"
})
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

// Multer configuration with Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Optional: Organize images by folder
      allowed_formats: ['jpg', 'jpeg', 'png','webp'],
    },
});

export const upload = multer({ storage }).array('upload_images', 5);

export const imageUpload = async(req,res) => {
    try {
        const imageUploadPromises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'uploads', // Optional: Organize images by folder in Cloudinary
        });
        return result.secure_url; // Store the secure URL from Cloudinary
        });
      const uploadedImages = await Promise.all(imageUploadPromises);

      const imageCreate = await ImageModel.create({
        images : uploadedImages
      })

      return res.status(201).json({
        success: true,
        message: `Image successfully upload`,
        imageCreate,
      });
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message,
          });
    }
}