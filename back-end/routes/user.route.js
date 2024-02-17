import { Router  } from "express";
import { userLogin, userRegister } from "../controlers/user.controler.js";
import { handleMulterError, upload } from "../middlewares/multer.js";

const userRoute = Router();

userRoute.post("/register",upload.single("avatar"),handleMulterError, userRegister);
userRoute.post("/login",userLogin);

export default userRoute;