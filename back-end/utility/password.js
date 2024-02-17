import bcrypt from "bcryptjs";

export const passwordHashed =(password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashedPasword = bcrypt.hashSync(password,salt);
    return hashedPasword;
}

export const comparePassword = (userInputPassword,existedPassword)=>{
    return bcrypt.compareSync(userInputPassword,existedPassword);
}