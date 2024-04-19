import { config } from "dotenv";
config();

const envObject = {
  mongoDB: process.env.MONGO_DB_URL,
  port: process.env.PORT,
  clientUrl: process.env.FRONTEND_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
  myEmail: process.env.SEND_MAIL_EMAIL,
  emailPass : process.env.SEND_MAIL_PASS,
};

export {envObject};