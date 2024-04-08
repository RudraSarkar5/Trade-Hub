import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// this function will connnect databases
const dbconnection = async () => {
  try {
    const mongoDbInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );

    if (mongoDbInstance) {
      console.log(`db connected at ${mongoDbInstance.connection.host} `);
    }
  } catch (error) {
    console.log("MongoDb connection ERROR : ", error);
     process.exit(1);
  }
};

export default dbconnection;
