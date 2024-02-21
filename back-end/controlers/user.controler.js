import emailValidator from "email-validator";
import { passwordHashed , comparePassword } from "../utility/password.js";
import userModel from "../models/user.model.js";
import { generateJwtToken } from "../utility/jwtAuth.js";
import cloudinary from "cloudinary";
import fs from "fs";


const cookieOption = {
  maxAge : 24 * 60 * 60 * 1000,
  httpOnly : true
}

export const userRegister = async (req, res) => {
  
  const { name, email, password , location } = req.body;

  try {
      // this will check that all the field is filled or not 
      if (!name || !email || !password || !location) {
        return res.status(400).json({
          success: false,
          message: "Please provide all the field"
        });
        
      }
      
      //   this will check the provided email is valid  or not
      if( !emailValidator.validate(email)){
          res.status(400).json({
            success: false,
            message: "Please provide a valid email"
          });
          return;
      }

    //   this will check the length of every field
      if(name.length < 5 || email.length < 5 || password.length < 6 || location.length < 3){
         return res.status(400).json({
           success: false,
           message: "Please provide valid size of every field",
         });
      }
      
  
      // check if already user exist or not
      const existingEmail = await userModel.findOne({email});
      
      // if user exist then simply send a response of user existance
      if(existingEmail){
        return res.status(400).json({
          success: false,
          message: "user already exist",
        });
      }
      
      // making user inputed password hashed
      const hashedPasword = passwordHashed(password);

    //  at first creating a document in mongodb database and save it 
    const user = await userModel.create({
      name,
      email,
      password: hashedPasword,
      location,
      avatar: {
        secure_url: "./assets/avatar.png",
        public_id: "dummy id",
      },
    });
    
  
  
  // if user upload image then it will invoke 
    if(req.file){
        console.log("enter after");
        const option = {
          folder: "Trade_Hub",
          width: 250,
          height: 250,
          crop: "fill",
          gravity: "center",
        };

            try {
              const result =  await cloudinary.v2.uploader.upload( req.file.path,option);
              if(result){
                 user.avatar.secure_url = result.secure_url;
                 user.avatar.public_id = result.public_id;
                 await user.save();
              }  
                
            } catch (error) {
              await user.deleteOne();
              return res.status(500).json({
                success: false,
                message: error.message,
              });
              
            } finally {
              fs.unlinkSync(req.file.path);
            }
            
          
            
        
              
        }

    //  set password undefined before sending back user details to client side
    user.password = undefined;
    
    // here by giving user value one token will be generate 
    const token = await generateJwtToken(JSON.parse(JSON.stringify(user)));
    
    // then save token as cookie
    res.cookie("token", token, cookieOption);

    //  if all the check is completly passed and user if created successfully then send success response
      res.status(201).json({
          success : true,
          message : "Account successfully created...",
          value : user
      })


  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
  
  
};

export const userLogin = async (req, res) => {
  const {email,password} = req.body;
 
    try {
      // this will check that all the field is filled or not
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Please provide all the field",
        });
        return;
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
        ;
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
        value : user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
};

export const getUserDetails = async(req,res)=>{
   const userId = req.user._id;
   console.log(userId);
   try {
    const user = await userModel.findById(userId);
      if (user) {
        return res.status(200).json({
          success: true,
          message: "fetched user data.",
          value : user
        });
      }
   } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message
      });
   }
   
   
}
export const userDelete = async(req,res)=>{
   const userId = req.user._id;
   console.log(userId);
   try {
    const result = await userModel.findByIdAndDelete(userId);
      if (result) {
        res.clearCookie("token");
        return res.status(200).json({
          success: true,
          message: "account successfully deleted.",
        });
      }
   } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message
      });
   }
   
   
}

export const userLogOut = (req,res)=>{
   res.clearCookie("token");
   return res.status(200).json({
     success: true,
     message: "User logged out successfully",
   });

}

export const userProfileEdit = async(req,res)=>{
    const userId = req.user._id;
    const {name , location} =  req.body;
    try {
       const user = await userModel.findById(userId);
       if (!name || !location) {
         return res.status(400).json({
           success: false,
           message: "Please provide all the field",
         });
       }

       user.name = name;
       user.location = location;
       if (req.file) {
         await cloudinary.v2.uploader.destroy(user.avatar.public_id);
         const option = {
           folder: "Trade_Hub",
           width: 250,
           height: 250,
           crop: "fill",
           gravity: "center",
         };

         try {
           await cloudinary.v2.uploader.upload(
             req.file.path,
             option,
             async function (success, error) {
               if (success) {
                 user.avatar.secure_url = success.secure_url;
                 user.avatar.public_id = success.public_id;
                 await user.save();
               }
             }
           );
         } catch (error) {
           return res.status(500).json({
             success: false,
             message: error.message,
           });
         }
       }
       return res.status(200).json({
         success: true,
         message: "profile updated successfully",
         value : user
       });

    } catch (error) {
      return res.status(500).json({
        success : true,
        message : error.message
      })
    }
    
}
