import { Router } from "express";
import {
  getMessage,
  addMessage,
  makeRead,
  makeFriend,
  deleteFriendIfNoMessage,
  getChatList,
} from "../controllers/chat.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const chatRouter = Router();

chatRouter.route("/add-friends").post(makeFriend);
chatRouter.route("/check-chat/:chatId").post(deleteFriendIfNoMessage);
chatRouter.route("/get-friends").get(isLoggedIn, getChatList);
chatRouter.route("/add-message").post(addMessage);
chatRouter.route("/make-read").post(makeRead);
chatRouter.route("/get-message").get(getMessage);

export default chatRouter;
