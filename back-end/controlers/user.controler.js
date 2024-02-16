import emailValidator from "email-validator";
import { passwordHashed } from "../utility/password.js";

export const userRegister = (req, res, next) => {
  const { name, email, password } = req.body;

//   this will check that all the field is filled or not 
  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Please provide all the field"
    });
  }
console.log(req.file);
  if (req.file) {
    // File uploaded successfully
    res.send("File uploaded successfully.");
  } else {
    res.send("file is not uploaded");
  }

//   this will check the provided email is valid  or not
  if(!emailValidator.validate(email)){
    res.status(400).json({
      success: false,
      message: "Please provide a valid email"
    });
  }

//   this will check the length of every field
  if(name.length < 5 || email.length < 5 || password.length < 6){
    res.status(400).json({
      success: false,
      message: "Please provide valid size of every field"
    });
  }

 const hashedPasword = passwordHashed(password);

 

//  if all the check is completly passed and user if created successfully then send success response
 res.status(201).json({
    success : true,
    message : "Account successfully created...",
    value : hashedPasword
 })


  
};

export const userLogin = (req, res, next) => {};
