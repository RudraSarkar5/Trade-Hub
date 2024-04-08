import { Router } from "express";
import {
  getFriends,
  getMessage,
  addMessage,
  makeRead,
} from "../controllers/chat.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const chatRouter = Router();

chatRouter.route("/get-friends").get(isLoggedIn, getFriends);
chatRouter.route("/add-message").post(addMessage);
chatRouter.route("/make-read").post(makeRead);
chatRouter.route("/get-message").get(getMessage);

export default chatRouter;
