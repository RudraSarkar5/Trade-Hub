import AppError from "../utility/customError.js";
import { getUserPayload } from "../utility/jwtAuth.js";

export const isLoggedIn = async (req,res,next)=>{
    
    const {token} = req.cookies;
    
    try {
        if(!token){
            
            throw new AppError("please logged in first",401);
    
        }else {
    
             const userPayload = await getUserPayload(token);
             req.user = userPayload;
             next();
    
        }
    } catch (error) {
        next(error);
    }
    
}