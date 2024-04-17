import { Router } from "express";
import {
  addMessage,
  makeRead,
  makeFriend,
  deleteFriendIfNoMessage,
  getChatList,
  getMessagesOfParticularChat,
  getPaticularSingleMessage,
  getChatNotification,
} from "../controllers/chat.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const chatRouter = Router();

chatRouter.route("/add-friends").post(makeFriend);
chatRouter.route("/check-empty-chat/:chatId").delete(deleteFriendIfNoMessage);
chatRouter.route("/get-friends").get(isLoggedIn, getChatList);
chatRouter.route("/add-message/:chatId").post(isLoggedIn,addMessage);
chatRouter.route("/make-read/:chatId").patch(makeRead);
chatRouter.route("/get-messages/:chatId").get(getMessagesOfParticularChat);
chatRouter.route("/single-messageData/:messageId").get(getPaticularSingleMessage);
chatRouter.route("/get-notification").get(isLoggedIn,getChatNotification);

export default chatRouter;
