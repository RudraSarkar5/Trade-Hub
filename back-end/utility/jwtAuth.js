import jwt from "jsonwebtoken";

export const generateJwtToken = async (payload)=>{
   const token = await  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:24*60*60});
    return token;
}

export const getUserPayload =async (token)=>{
     const userPayload =  await jwt.verify(token,process.env.SECRET_KEY);
     return userPayload;
}