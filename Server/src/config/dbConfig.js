import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { envObject } from "./envConfig.js";


const dbconnection = async () => {

  try {
    mongoose.connection.on("connected",()=>{
      console.log("database connected successfully.");
    })

    mongoose.connection.on("disconnected",()=>{
      console.log("database connection failled");
      process.exit(1);
    })

    await mongoose.connect(
      `${envObject.mongoDB}/${DB_NAME}`
    );
    
  } catch (error) {

    console.log("MongoDb connection ERROR : ", error.message);
    process.exit(1);

  }

};

export default dbconnection;
