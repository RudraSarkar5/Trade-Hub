import emailValidator from "email-validator";
import { passwordHashed, comparePassword } from "../utility/password.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import { generateJwtToken } from "../utility/jwtAuth.js";
import AppError from "../utility/customError.js";
import {
  fileRemoveFromDisc,
  fileRemoveFromCloud,
  fileUploadInCloudinary,
} from "../utility/fileManage.js";
import { cookieOption } from "../constants.js";



export const userRegister = async (req, res, next) => {

  let user = null;
  let result = null;

  const { name, email, password, location } = req.body;
 
  try {
    // this will check that all the field is filled or not
    if (!name || !email || !password || !location) {
       throw new AppError("Please provide all the field",400);
    }

    //   this will check the provided email is valid  or not
    if (!emailValidator.validate(email)) {
      throw new AppError("Please provide a valid email", 400);
    }

    // check if already user exist or not
    const existingEmail = await userModel.findOne({ email });

    // if user exist then simply send a response of user existance
    if (existingEmail) {
      throw new AppError("user already exist", 400);
    }

    // making user inputed password hashed
    const hashedPasword = await passwordHashed(password);

    //at first creating a document in mongodb database and save it

    const avatarDocument = {
      userUploaded: false,
      secure_url: "",
      public_id: "",
    };

     user = await userModel.create({
       name,
       email,
       password: hashedPasword,
       location,
       avatar: avatarDocument,
     });

    // if user upload image then it will invoke
    if (req.file) {
       result = await fileUploadInCloudinary(req.file);

      if (result) {
        user.avatar.secure_url = result.secure_url;
        user.avatar.public_id = result.public_id;
        user.avatar.userUploaded = true;
      } else {

        throw new AppError("image is not uploaded in cloud", 500);

      }

    }

    //  set password undefined before sending back user details to client side
    await user.save();
    user.password = undefined;
    

    // here by giving user value one token will be generate
    const token = await generateJwtToken(JSON.parse(JSON.stringify(user)));

    // then save token as cookie
    res.cookie("token", token, cookieOption);



    //  if all the check is completly passed and user if created successfully then send success response
    res.status(201).json({
      success: true,
      message: "Account successfully created...",
      user,
    });

  } catch (error) {

    if(result){
      await fileRemoveFromCloud(result.public_id);
    }

    if (user) {
      await userModel.deleteOne({ _id: user._id });
    }

    next(error);

  } finally {

    // if user upload a file no matter error occures it will clear server disc storage
    if (req.file) {

      fileRemoveFromDisc(req.file);

    }

  }

};

export const userLogin = async (req, res, next) => {
  
  const { email, password } = req.body;

  try {
    // this will check that all the field is filled or not
    if (!email || !password) {
      
      throw new AppError("Please provide all the field", 400);

    }

    //   this will check the provided email is valid  or not
    if (!emailValidator.validate(email)) {

      throw new AppError("Please provide a valid email", 400);

    }

    // check if  user exist or not
    const user = await userModel.findOne({ email });

    // if user not  exist then simply send a response of user not exist
    if (!user) {

      throw new AppError("user not exit", 400);
  
    }
    // if userInputed password does not match with existed password to the co reponding email then invalid password respond send
    if (!comparePassword(password, user.password)) {

      throw new AppError("incorrect password", 400);
      
    }

    //  set password undefined before sending back user details to client side
    user.password = undefined;

    // here by giving user value one token will be generate
    const token = await generateJwtToken(JSON.parse(JSON.stringify(user)));

    // then save token as cookie
    res.cookie("token", token, cookieOption);

    // if all  match successfully then user loggin successfully and send a success response
    return res.status(200).json({
      success: true,
      message: "user login succesfully",
      user,
    });

  } catch (error) {

    next(error);

  }

};

export const getUserDetails = async (req, res, next) => {

  const userId = req.user._id;

  try {

    const user = await userModel.findById(userId);

    user.password = undefined;

    if (user) {

      return res.status(200).json({
        success: true,
        message: "fetched user data.",
        user,
      });

    }

  } catch (error) {
    
    next(error);
   
  }

};

export const getSellerDetails = async (req, res, next) => {

  const { id } = req.params;

  try {

    const user = await userModel.findById(id);

    if (user) {

      return res.status(200).json({
        success: true,
        message: "fetched user data.",
        user,
      });

    }else {

      throw new AppError("user not found",400);

    }

  } catch (error) {

    next(error);

  }

};

export const userDelete = async (req, res, next) => {

  const userId = req.user._id;
 
  try {

    const products = await productModel.find({userId});

    await productModel.deleteMany({userId});
    
    const user = await userModel.findByIdAndDelete(userId);

    await fileRemoveFromCloud(user.avatar.public_id);

     const productImages = products.reduce((acc, product) => { 

       product.images.forEach((image) => {
         acc.push(image.public_id);
       });

       return acc;

     }, []);


     const removeproductImagesFromCloud = async (productsPubicIds)=>{

          const removePromisses = productsPubicIds.map((image_id)=>{

              return fileRemoveFromCloud(image_id);
              
          })

          await Promise.all(removePromisses);

       }

    await removeproductImagesFromCloud(productImages);


    if (user) {
      res.clearCookie("token");

      return res.status(200).json({
        success: true,
        message: "account successfully deleted.",
      });
    }
  } catch (error) {

    next(error);

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

  try {

    if (!name || !location) {

      throw new AppError("Please provide all the field", 400);
    }

    const user = await userModel.findById(userId);

    user.name = name;
    user.location = location;

    if (req.file) {

      if (user.avatar.userUploaded) {

         fileRemoveFromCloud(user.avatar.public_id);

      }

      try {

        const result = await fileUploadInCloudinary(req.file);

        if (result) {

          user.avatar.secure_url = result.secure_url;
          user.avatar.public_id = result.public_id;

        }
      } catch (error) {
        
          return next(error);
      }
    }
    await user.save();

    const updatedUserDetails = await userModel.findById(userId);

    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      user : updatedUserDetails,
    });

  } catch (error) {

    next(error);
  
  } finally {

    if (req.file) {

      fileRemoveFromDisc(req.file);

    }

  }
};
