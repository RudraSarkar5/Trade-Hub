import { envObject } from "../config/envConfig.js";
import nodemailer from "nodemailer";

export const sendMail = ( fromEmail , toEmail,  subject , message, next )=>{
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : envObject.myEmail,
            pass : envObject.emailPass,
            
        }
    })

    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
             next(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    })

}
