import { Router  } from "express";
import { userLogin, userRegister,userDelete, userLogOut, userProfileEdit, getUserDetails, getSellerDetails } from "../controlers/user.controler.js";
import { handleMulterError, upload } from "../middlewares/multer.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoute = Router();

userRoute.post("/register",upload.single("avatar"),handleMulterError, userRegister);
userRoute.post("/log-in",userLogin);
userRoute.delete("/delete",isLoggedIn,userDelete);
userRoute.get("/user-details", isLoggedIn, getUserDetails);
userRoute.get("/seller-details/:sellerId", getSellerDetails);
userRoute.get("/log-out",userLogOut);
userRoute.put("/profile-update",upload.single("avatar"),isLoggedIn,userProfileEdit);

export default userRoute;