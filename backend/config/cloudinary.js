import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME, // ✅
        api_key: process.env.CLOUDINARY_API_KEY, // ✅
        api_secret: process.env.CLOUDINARY_API_SECRET // 🔥 Yeh galti thi bhai
    });
    console.log("🔥 Cloudinary Connected");
    
};

export default connectCloudinary;
