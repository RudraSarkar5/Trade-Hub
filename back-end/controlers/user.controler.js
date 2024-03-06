import emailValidator from "email-validator";
import { passwordHashed, comparePassword } from "../utility/password.js";
import userModel from "../models/user.model.js";
import { generateJwtToken } from "../utility/jwtAuth.js";
import AppError from "../utility/customError.js";
import {
  fileRemoveFromDisc,
  fileRemoveFromCloud,
  fileUploadInCloudinary,
} from "../utility/fileManage.js";

const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  httpOnly: true,
};

export const userRegister = async (req, res, next) => {
  let user = null;

  const { name, email, password, location } = req.body;

  try {
    // this will check that all the field is filled or not
    if (!name || !email || !password || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the field",
      });
    }

    //   this will check the provided email is valid  or not
    if (!emailValidator.validate(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    // check if already user exist or not
    const existingEmail = await userModel.findOne({ email });

    // if user exist then simply send a response of user existance
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    // making user inputed password hashed
    const hashedPasword = await passwordHashed(password);

    //at first creating a document in mongodb database and save it

    const avatarDocument = {
      userUploaded: false,
      secure_url: "/avatar.png",
      public_id: "",
    };

    // if user upload image then it will invoke
    if (req.file) {
      const result = await fileUploadInCloudinary(req.file);

      if (result) {
        avatarDocument.secure_url = result.secure_url;
        avatarDocument.public_id = result.public_id;
        avatarDocument.userUploaded = true;
      } else {
        throw new AppError(500, "image is not uploaded in cloud");
        next();
      }
    }

    user = await userModel.create({
      name,
      email,
      password: hashedPasword,
      location,
      avatar: avatarDocument,
    });

    //  set password undefined before sending back user details to client side
    user.password = undefined;

    // here by giving user value one token will be generate
    const token = await generateJwtToken(JSON.parse(JSON.stringify(user)));

    // then save token as cookie
    res.cookie("token", token, cookieOption);

    //  if all the check is completly passed and user if created successfully then send success response
    res.status(201).json({
      success: true,
      message: "Account successfully created...",
      value: user,
    });
  } catch (error) {
    console.log(error.message);

    if (user) {
      await userModel.deleteOne({ _id: user._id });
    }

    next(new AppError(500, error.message));
  } finally {
    // if user upload a file no matter error occures it will clear server disc storage
    if (req.file) {
      fileRemoveFromDisc(req.file);
    }
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // this will check that all the field is filled or not
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the field",
      });
    }

    //   this will check the provided email is valid  or not
    if (!emailValidator.validate(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    // check if  user exist or not
    const user = await userModel.findOne({ email });

    // if user not  exist then simply send a response of user not exist
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not exit",
      });
    }
    // if userInputed password does not match with existed password to the co reponding email then invalid password respond send
    if (!comparePassword(password, user.password)) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    //  set password undefined before sending back user details to client side
    user.password = undefined;

    // here by giving user value one token will be generate
    const token = await generateJwtToken(JSON.parse(JSON.stringify(user)));

    // then save token as cookie
    res.cookie("token", token, cookieOption);

    // if all  match successfully then user loggin successfully and send a success response
    res.status(200).json({
      success: true,
      message: "user login succesfully",
      value: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "fetched user data.",
        value: user,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerDetails = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const user = await userModel.findById(sellerId);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "fetched user data.",
        value: user,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

export const userDelete = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (user) {
      res.clearCookie("token");

      return res.status(200).json({
        success: true,
        message: "account successfully deleted.",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

export const userLogOut = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const userProfileEdit = async (req, res) => {
  const userId = req.user._id;
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the field",
    });
  }

  try {
    const user = await userModel.findById(userId);

    user.name = name;
    user.location = location;

    if (req.file) {
      if (user.avatar.userUploaded) {
        fileRemoveFromCloud(user.avatar);
      }

      try {
        const result = await fileUploadInCloudinary(req.file);

        if (result) {
          user.avatar.secure_url = result.secure_url;
          user.avatar.public_id = result.public_id;
        }
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
    await user.save();

    const updatedUserDetails = await userModel.findById(userId);

    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      value: updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    if (req.file) {
      fileRemoveFromDisc(req.file);
    }
  }
};
