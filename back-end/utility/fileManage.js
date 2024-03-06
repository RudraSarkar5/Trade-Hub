import cloudinary from "cloudinary";
import {promises as fs} from "fs";
import AppError from "./customError.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ImageOption = {
  folder: "Trade_Hub",
  width: 250,
  height: 250,
  gravity: "center",
};

// this function will file in cloudinary
const fileUploadInCloudinary = async (localFilePath) => {
  
  try {
    
    const response = await cloudinary.v2.uploader.upload(
      localFilePath.path,
      ImageOption
    );
    console.log("response is ", response);
    
    return response;

  } catch (error) {
    
    return null;

  }
     
};

// this function will remove any file from disc Storage
const fileRemoveFromDisc = async (localFile) => {
 
  try {

    if (Array.isArray(localFile)) {
      
      for (const file of localFile) {
        await fs.unlink(file.path); 
      }

    } else {

      await fs.unlink(localFile.path);

    }

  } catch (error) {

    console.error("Error removing file(s):", error);
    throw new AppError(500,"file not removing ...");

  }

};

// this function will remove any file  from cloude
const fileRemoveFromCloud = async (files) => {

  try {

    if (Array.isArray(files)) {

      for (const file of files) {

        await cloudinary.v2.uploader.destroy(file.pubic_id);

      }
    } else {

      await cloudinary.v2.uploader.destroy(files.pubic_id);

    }

  } catch (error) {

    console.error("Error to destroy file in cloudinary :", error);
    throw new AppError(500,"file not removing ...");

  }

};

export { fileUploadInCloudinary, fileRemoveFromDisc, fileRemoveFromCloud };
