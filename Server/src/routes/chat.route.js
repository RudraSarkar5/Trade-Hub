import { Router } from "express";
import {
  addMessage,
  makeRead,
  makeFriend,
  deleteFriendIfNoMessage,
  getChatList,
  getMessagesOfParticularChat,
} from "../controllers/chat.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const chatRouter = Router();

chatRouter.route("/add-friends").post(makeFriend);
chatRouter.route("/check-chat/:chatId").post(deleteFriendIfNoMessage);
chatRouter.route("/get-friends").get(isLoggedIn, getChatList);
chatRouter.route("/add-message/:chatId").post(isLoggedIn,addMessage);
chatRouter.route("/make-read").post(makeRead);
chatRouter.route("/get-messages/:chatId").get(getMessagesOfParticularChat);

export default chatRouter;
