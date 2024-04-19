import { envObject } from "../config/envConfig.js";
import nodemailer from "nodemailer";

export const sendMail = ( email , subject , message, next)=>{
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : envObject.myEmail,
            pass : envObject.emailPass,
            
        }
    })

    const mailOptions = {
        from : envObject.myEmail,
        to : email,
        subject : subject,
        html : message,
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
             next(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    })

}
