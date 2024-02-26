import { Router } from "express";
import {getFriends,getMessage,addMessage} from "../controlers/chat.controler.js"
import {isLoggedIn} from "../middlewares/isLoggedIn.js"

const chatRouter = Router();

<<<<<<< HEAD
chatRouter.get("/get-friends",isLoggedIn, getFriends);
=======
chatRouter.get("/get-friends/:userId",getFriends);
>>>>>>> afc1936a90814618901bff85bd336b8759d6ee8f
chatRouter.post("/add-message",addMessage);
chatRouter.get("/get-message",getMessage);


export default chatRouter;