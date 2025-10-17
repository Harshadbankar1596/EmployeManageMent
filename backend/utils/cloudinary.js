import dotenv from "dotenv"
dotenv.config()
import cloudinary from "cloudinary";

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

if (CLOUD_NAME && API_KEY && API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
} else {
  console.error("Missing Cloudinary environment variables!");
}

// const uploadTheImage = async (localFilePath) => {
//   try {
//     if (!localFilePath) {
//       throw new Error("No file path provided to Cloudinary uploader.");
//     }

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       folder: "Collage_News",
//       resource_type: "auto",
//     });


//     return response;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return null;
//   }
// };


 const uploadTheImage = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, {folder: "Collage_News" , resource_type: "auto" }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default uploadTheImage;
