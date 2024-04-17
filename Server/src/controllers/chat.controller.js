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
            success: true,
            message: "successfully fetched chat data",
            chat : friendShipExist,
          });

      }

      const friendShip = await chatModel.create({
        participants: [senderId, receiverId],
      });

      return res.status(200).json({
        success : true,
        message : "successfully added chat.",
        chat : friendShip,
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

      const messageExist = await messageModel.find({chatId});
      
      if (messageExist == 0) {

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

export const getMessagesOfParticularChat = async (req, res, next) => {

  const { chatId } = req.params;

  try {

    if ( !chatId ) {
      throw new AppError("invalid request", 400);
    }

    const allMessages = await messageModel.find(
        { chatId },{createdAt:0,updatedAt:0,chatId:0}).sort({ timestamp: -1 }
      );

    return res.status(200).json({
      success: true,
      allMessages,
    });
    
  } catch (error) {

    next(error);

  }
  
};

export const getPaticularSingleMessage = async ( req, res, next ) =>{
    
  const { messageId } = req.params;

  try {
    
    const messageData = await messageModel.findById(messageId);

    if (messageData) {
      return res.status(200).json({
        success: true,
        message: "successfully fetched message.",
        messageData,
      });
    }

  } catch (error) {
    
    next(error);

  }
}

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

    const updatedChatInstance = await chatModel.findByIdAndUpdate(
      chatId,
      { $set: { lastMessage: messageInstance._id } },
      { new: true }
    );


    return res.status(200).json({
      success : true,
      message : "message successfully saved",
    })

  } catch (error) {
    next(error);
  }

};

export const makeRead = async (req, res , next ) => {

  const { chatId } = req.params;

  try {
    
    const updatedChat = await chatModel.findByIdAndUpdate(chatId,{ $set : { unRead : false }},{ new : true });
    
    if( updatedChat ){
      res.status(200).json({
        success : true,
        message : "successfully updated unread field.",
        chat : updatedChat,
      })
    }

  } catch (error) {
     
    next(error);
  
  }
  
};

export const makeUnRead = async (chatId) => {

  try {

   const existChat = await chatModel.findByIdAndUpdate(
     chatId,
     { $set: { unRead: true } },
     { new: true }
   );
    
  } catch (error) {

    console.log(error.message);

  }

  
 
  
};

export const getChatNotification = async( req, res, next ) => {
   
  const userId = req.user._id;

  try {

    const notification = await chatModel.aggregate([
      {
        $match: {
          participants: new mongoose.Types.ObjectId(userId),
          unRead: true,
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "lastMessage",
          foreignField : "_id",
          as : "lastMessage",
        },
      },
      {
        $unwind : "$lastMessage"
      },
      {
        $match : {
          "lastMessage.senderId" : { $ne : new mongoose.Types.ObjectId(userId)} 
        }
      },
      {
        $count : "notificationCount",
      }
    ]);

    res.status(200).json({
      success : true,
      message : "successfully fetched notification",
      data : notification[0],
    })

  } catch (error) {
    
    next(error);

  }

}


