import { Router } from "express";
import {getFriends,getMessage,addMessage, makeRead} from "../controlers/chat.controler.js"
import {isLoggedIn} from "../middlewares/isLoggedIn.js"

const chatRouter = Router();


chatRouter.get("/get-friends",isLoggedIn, getFriends);
chatRouter.post("/add-message",addMessage);
chatRouter.post("/make-read",makeRead);

chatRouter.get("/get-message",getMessage);


export default chatRouter;