import bcrypt from "bcryptjs";
import crypto from  "node:crypto";

export const passwordHashed =(password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashedPasword = bcrypt.hashSync(password,salt);
    return hashedPasword;
}

export const comparePassword = (userInputPassword,existedPassword)=>{
    return bcrypt.compareSync(userInputPassword,existedPassword);
}

export const generateCryptoToken = ()=>{

    const token = crypto.randomBytes(12).toString("hex");
    return token;
}

export const hashedCryptoToken = (token)=>{
    const hashedToken = crypto.createHash("sha256")
                               .update(token)
                               .digest("hex");

    return hashedToken;
}
