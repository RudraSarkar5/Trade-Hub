import { Router  } from "express";
import { userRegister } from "../controlers/user.controler";

const userRoute = Router();

userRoute.post("/register",userRegister)