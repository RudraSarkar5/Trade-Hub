import { getUserPayload } from "../utility/jwtAuth.js";

export const isLoggedIn = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "please logged in first"
        })
    }else {
         const userPayload = await getUserPayload(token);
         req.user = userPayload;
         next();
    }
    
}