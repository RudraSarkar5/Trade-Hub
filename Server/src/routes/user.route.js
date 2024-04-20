import { Router } from "express";
import {
  userLogin,
  userRegister,
  userDelete,
  userLogOut,
  userProfileEdit,
  getUserDetails,
  getSellerDetails,
  forgetPassword,
  resetPassword,
  sendFeedback,
} from "../controllers/user.controller.js";
import {
  upload,
} from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const userRoute = Router();

// to create user
userRoute
  .route("/register")
  .post(upload.single("avatar"), userRegister);

// to login user
userRoute.route("/login").post(userLogin);

// to delete user
userRoute.route("/delete").delete(isLoggedIn, userDelete);

// to get userDetails
userRoute.route("/user-details").get(isLoggedIn, getUserDetails);

// to get SellerDetails
userRoute.route("/user-details/:id").get(getSellerDetails);

// to logout user
userRoute.route("/logout").get(isLoggedIn, userLogOut);

// to update profile
userRoute
  .route("/profile-update")
  .patch(upload.single("avatar"), isLoggedIn, userProfileEdit);

// to send mail to change password
userRoute.route("/forget-password").post(forgetPassword);  

// resetPassword
userRoute.route("/reset-password/:resetToken").post(resetPassword);  

// resetPassword
userRoute.route("/send-feedback").post(isLoggedIn,sendFeedback);  

export default userRoute;
