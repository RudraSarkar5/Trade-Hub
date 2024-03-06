import { Router } from "express";
import {
  userLogin,
  userRegister,
  userDelete,
  userLogOut,
  userProfileEdit,
  getUserDetails,
  getSellerDetails,
} from "../controlers/user.controler.js";
import { handleMulterError, upload } from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const userRoute = Router();

// to create user
userRoute
  .route("/register")
  .post(upload.single("avatar"),handleMulterError,  userRegister);

// to login user
userRoute.route("/login").post(userLogin);

// to delete user
userRoute.route("/delete").delete(isLoggedIn, userDelete);

// to get userDetails
userRoute.route("/user-details").get(isLoggedIn, getUserDetails);

// to get SellerDetails
userRoute.route("/seller-details/:sellerId").get(getSellerDetails);

// to logout user
userRoute.route("/logout").get(userLogOut);

// to update profile
userRoute
  .route("/profile-update")
  .put(upload.single("avatar"), isLoggedIn, userProfileEdit);

  
export default userRoute;
