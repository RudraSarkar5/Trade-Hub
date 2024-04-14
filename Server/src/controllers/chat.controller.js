import messageModel from "../models/message.model.js";
import chatModel from "../models/chat.model.js";
import UserModel from "../models/user.model.js";
import AppError from "../utility/customError.js";
import mongoose from "mongoose";


export const makeFriend = async (req, res, next) => {

    const { senderId , receiverId } = req.query;

    try {

      if ( senderId == null || receiverId == null ){
        throw new AppError ("invalid request!",400);
      }

      const friendShipExist = await chatModel.findOne({participants: { $all: [senderId, receiverId] },});
      
      if ( friendShipExist){

          return res.status(200).json({
            success : true,
            message : "successfully fetched chat data",
            data : friendShipExist,
          })

      }

      const friendShip = await chatModel.create({
        participants: [senderId, receiverId],
      });

      return res.status(200).json({
        success : true,
        message : "successfully added chat.",
      })

    } catch (error) {
      next(error);
    }
}

export const deleteFriendIfNoMessage = async (req, res, next) => {

    const { chatId } = req.params;

    try {

      if ( !chatId ) {
         throw new AppError("invalid request",400);
      }

      const chatExist = await messageModel.find({chatId});
      
      if (chatExist.length == 0) {
        
         await chatModel.findByIdAndDelete(chatId);

      }

      return res.status(200).json({
        success : true,
        message : "successfully deleted.",
      })

    } catch (error) {
      next(error);
    }
}

export const getChatList = async (req, res, next) => {

  const userId = req.user._id;

  try {
    const chats = await chatModel.aggregate([
      {
        $match: {
          participants: {
            $elemMatch: {
              $eq: new mongoose.Types.ObjectId(userId),
            },
          },
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        // Lookup for the participants present
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "participants",
          as: "participants",
          pipeline: [
            {
              $match: {
                _id: { $ne: new mongoose.Types.ObjectId(userId) },
              },
            },
            {
              $project: {
                password: 0,
                location: 0,
              },
            },
          ],
        },
      },
      {
        // Lookup for the group chats
        $lookup: {
          from: "messages",
          foreignField: "_id",
          localField: "lastMessage",
          as: "lastMessages",
        },
      },
      {
        $addFields: {
          lastMessage: {
            $cond: {
              if: { $eq: [{ $size: "$lastMessages" }, 0] },
              then: null,
              else: { $arrayElemAt: ["$lastMessages", 0] },
            },
          },
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$participants", 0] },
        },
      },
      {
        $unset: "participants", // Remove the participants array
      },
      {
        $unset: "lastMessages", // Remove the participants array
      },
    ]);

    

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      chats, // Include the fetched chats in the response
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching data",
    });
  }
};

export const getMessage = async (req, res, next) => {

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

export const addMessage = async (req, res, next) => {
  
  const {  content } = req.body;
  const { chatId } = req.params;
  const senderId = req.user._id;
 
  try {
    
    if (!content || !chatId) {
      throw new AppError("please fill all the field ", 400);
    }

    const messageInstance = await messageModel.create({
      senderId,
      chatId,
      content,
    });
    console.log(messageInstance);

    const updatedChatInstance = await chatModel.findByIdAndUpdate(chatId , {$set:{lastMessage:messageInstance._id}},{new : true});

    console.log(updatedChatInstance);

    return res.status(200).json({
      success : true,
      message : "message successfully saved",
    })

  } catch (error) {
    next(error);
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
