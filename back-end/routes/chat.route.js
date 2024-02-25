import { Router } from "express";
import {getFriends,getMessage,addMessage} from "../controlers/chat.controler.js"

const chatRouter = Router();

chatRouter.get("/get-friends",getFriends);
chatRouter.post("/add-message",addMessage);
chatRouter.get("/get-message",getMessage);


export default chatRouter;