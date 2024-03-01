import { chatModel } from "../models/chat.model.js";
import friendModel from "../models/friend.model.js";
import UserModel from "../models/user.model.js";

export const getFriends = async (req, res) => {
  const userId = req.user._id;

  const chatFriends = await friendModel
    .find({ userId })
    .sort({ updated: -1 })
    .populate({
      path: "friendId",
      select: "_id name avatar",
    })
    .select("lastMessage unRead");


  return res.status(200).json({
    success: true,
    message: "data fetched successfully",
    friends: chatFriends,
  });
};

export const getMessage = async (req, res) => {
  const { senderId, receiverId } = req.query;
  const conversation = await chatModel.findOne({
    participant: { $all: [senderId, receiverId] },
  });
  if (conversation) {
    return res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  } else {
    return res.status(200).json({
      success: true,
      messages: [],
    });
  }
};

export const addMessage = async (req, res) => {
  // fetch the body of the request
  const { senderId, receiverId, message } = req.body;
  
  // check if the sender and receiver already exist or not
  const friendShipExist = await friendModel.findOne({
    userId: receiverId,
    friendId: senderId,
  });
  

  if (friendShipExist) {
    friendShipExist.unRead = true;
    friendShipExist.lastMessage = message;
    await friendShipExist.save();
    const forUser = await friendModel.findOne({
      userId: senderId,
      friendId: receiverId,
    });

    forUser.unRead = false;
    forUser.lastMessage = message;
    await forUser.save();
  } else {
    const forUser = await friendModel.create({
      userId: senderId,
      friendId: receiverId,
      lastMessage: message,
      unRead: false,
    });

    const forFriend = await friendModel.create({
      userId: receiverId,
      friendId: senderId,
      lastMessage: message,
      unRead: true,
    });

    await forUser.save();
    await forFriend.save();
  }

  const messageDocument = {
    senderId,
    content: message,
  };

  let conversation = await chatModel.findOne({
    participant: { $all: [senderId, receiverId] },
  });

  if (conversation) {
    // Conversation exists, add message to existing conversation
    conversation.messages.push(messageDocument);
    await conversation.save();
  } else {
    // Conversation does not exist, create a new conversation
    conversation = await chatModel.create({
      participant: [senderId, receiverId],
      messages: [messageDocument],
    });
  }
  return res.status(200).json({
    success : true,
    messagess : "succesfully insertend"
  })
};

export const makeRead = async (req, res) => {
  const { receiverId, senderId } = req.body;
  const userFriend = await friendModel.findOne({
    userId: senderId,
    friendId: receiverId,
  });
console.log(userFriend);
  if (userFriend) {
    userFriend.unRead = false;
    await userFriend.save();
  }
  return res.status(200).json({
    success: true,
    message: "all good",
  });
};
