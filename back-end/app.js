import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
config();
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true
  })
);

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Invalid path",
  });
});

export default app;
