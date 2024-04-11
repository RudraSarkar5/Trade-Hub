import cloudinary from "cloudinary";
import {promises as fs} from "fs";
import AppError from "./customError.js";
import { envObject } from "../config/envConfig.js";

cloudinary.v2.config({
  cloud_name: envObject.CLOUDINARY_CLOUD_NAME,
  api_key: envObject.CLOUDINARY_API_KEY,
  api_secret: envObject.CLOUDINARY_API_SECRET,
});


// this function will file in cloudinary
const fileUploadInCloudinary = async (localFilePath) => {
  
  
  try {
    
    const response = await cloudinary.v2.uploader.upload(
      localFilePath.path,
      {folder:"Trade-Hub"}
    );

    // console.log("response is ", response);
    
    return response;

  } catch (error) {
      
      throw new AppError("image is not uploaded in cloud...",500);

  }
     
};

// this function will remove any file from disc Storage
const fileRemoveFromDisc = async (localFile) => {
 
  try {

    // if (Array.isArray(localFile)) {
      
    //   for (const file of localFile) {
    //     await fs.unlink(file.path); 
    //   }

    // } else {

      await fs.unlink(localFile.path);

    // }

  } catch (error) {

    // console.error("Error removing file(s):", error);
    throw new AppError(500,"file not removing ...");

  }

};

// this function will remove any file  from cloude
const fileRemoveFromCloud = async (imageId) => {

  try {

    // if (Array.isArray(files)) {

    //   for (const file of files) {

    //     await cloudinary.v2.uploader.destroy(file.public_id);

    //   }
    // } else {

      await cloudinary.v2.uploader.destroy(imageId);

    // }

  } catch (error) {

    console.error("Error to destroy file in cloudinary :", error);
    throw new AppError(500,"file not removing ...");

  }

};

export { fileUploadInCloudinary, fileRemoveFromDisc, fileRemoveFromCloud };
