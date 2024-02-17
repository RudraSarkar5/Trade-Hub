import jwt from "jsonwebtoken";

export const generateJwtToken =(payload)=>{
   const token =  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:24*60*60});
    return token;
}