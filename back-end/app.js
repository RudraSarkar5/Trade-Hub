import express from "express";
import {config} from "dotenv";


config();

const app = express();
app.use(express.json());


app.use("api/user",userRoute);


app.use("*", (req, res) => {
  res.status(404).json({
    success:false,
    message : "Invalid path" 
  })
});

export default app;