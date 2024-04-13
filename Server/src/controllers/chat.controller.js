import  chatModel  from "../models/message.model.js";
import friendModel from "../models/friend.model.js";
import UserModel from "../models/user.model.js";
import AppError from "../utility/customError.js";



export const getFriends = async (req, res, next) => {

  const userId = req.user._id;
  
  try {
     const chatFriends = await friendModel
       .find({ userId })
       .sort({ updatedAt: -1 })
       .populate("friendId")
       .select("lastMessage unRead");

       const notificationCount = chatFriends.reduce((total, friend) => {
         if (friend.unRead) {
           return total + 1;
         }
         return total;
       }, 0);
       
       
     return res.status(200).json({
       success: true,
       message: "data fetched successfully",
       friends: chatFriends,
       notification : notificationCount
     });
  } catch (error) {
    console.log(error.message);
  }
 
};

export const getMessage = async (req, res) => {

  const { senderId, receiverId } = req.query;

  try {

    if (receiverId == null || senderId == null) {
      throw new AppError("invalid request", 400);
    }

    const conversation = await chatModel.find({
      participant: { $all: [senderId, receiverId] },
    }).sort({timestamp : -1});

    if (conversation) {
      return res.status(200).json({
        success: true,
        messages: conversation.messages,
      });
    } 

  } catch (error) {

    next(error);

  }
  
};

export const addMessage = async (req, res) => {
  // fetch the body of the request
  const { senderId, receiverId, message } = req.body;
  
  
  const friendExistForUser = await friendModel.findOne({
    userId: senderId,
    friendId: receiverId,
  });

  if (friendExistForUser) {

    friendExistForUser.lastMessage = message;
    await friendExistForUser.save();

  } else {

    const forUser = await friendModel.create({
      userId: senderId,
      friendId: receiverId,
      lastMessage: message,
    });

  }

  const friendShipExistForFriend = await friendModel.findOne({
      userId: receiverId,
      friendId: senderId,
    });

  if (friendShipExistForFriend) {

    friendShipExistForFriend.lastMessage = message;
    await friendExistForUser.save();

  } else {

    const forFriend = await friendModel.create({
      userId: receiverId,
      friendId: senderId,
      lastMessage: message,
    });

  }

  const messgaeRecord = await chatModel.create({
    participants : [senderId,receiverId],
    senderId,
    content: message,
  });

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

  if (userFriend) {
    userFriend.unRead = false;
    await userFriend.save();
  }
  return res.status(200).json({
    success: true,
    message: "all good",
    receiverId
  });
};

export const makeUnRead = async ({userId,friendId}) => {

  const userFriend = await friendModel.findOne({
    userId,
    friendId
  });
  
  if (userFriend) {
    userFriend.unRead = true;
    await userFriend.save();
  }
  
};
