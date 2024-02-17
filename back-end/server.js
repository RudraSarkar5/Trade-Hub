import app from "./app.js";
import cloudinary from "cloudinary";

import dbconnection from "./dbConfig/dbConfig.js";
const PORT = process.env.PORT || 5000;

console.log("Before Morgan middleware");

console.log("After Morgan middleware");


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(PORT, async() => {
  await dbconnection();
  console.log(`server is on in http://localhost:${PORT}`);
});