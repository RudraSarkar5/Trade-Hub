import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import chatRoute from "./routes/chat.route.js";
import { handleError } from "./middlewares/handleError.middleware.js";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(cookieParser());


app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/chats", chatRoute);

app.use(handleError);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Invalid path",
  });
});


export default app;
