import { Router  } from "express";
import { userRegister } from "../controlers/user.controler.js";
import { handleMulterError, upload } from "../middlewares/multer.js";

const userRoute = Router();

userRoute.post("/register",upload.single("avatar"),handleMulterError, userRegister);

export default userRoute;