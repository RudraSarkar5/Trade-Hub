import { chatModel } from "../models/chat.model.js"
import UserModel  from "../models/user.model.js"

export const getFriends = async (req, res) => {
  
  const userId = req.user._id;
    
   const chatFriends = await chatModel.find({participant:userId}).populate({
      path : "participant",
      match : {_id : {$ne : userId}},
      select : "_id name avatar"
   }).select("lastMessage");

   return res.status(200).json({
    success : true,
    message : "data fetched successfully",
    friends : chatFriends
   })
 
    return res.status(500).json({
      success: false,
      message: "Error fetching friends",
      chatFriends
    });
  
};


export const getMessage=async (req,res)=>{
    const {senderId,receiverId} = req.query;
    const conversation = await chatModel.findOne({"participant" : {$all:[senderId,receiverId]}});
    if(conversation){
        return res.status(200).json({
          success: true,
          messages : conversation.messages
        });
    }else{
        return res.status(200).json({
          success: true,
          messages: []
        });
    }
    
}


export const addMessage = async (req, res) => {
  console.log(req.body);
  const { senderId, receiverId, message } = req.body;
  const messageDocument = {
    senderId,
    content: message,
  };

  try {
    let conversation = await chatModel.findOne({
      participant: { $all: [senderId, receiverId] }
    });

    if (conversation) {
      // Conversation exists, add message to existing conversation
      conversation.messages.push(messageDocument);
      conversation.lastMessage = message;
      await conversation.save();
      return res.status(200).json({
        success: true,
        conversation
      });
    } else {

      // Conversation does not exist, create a new conversation
      conversation = await chatModel.create({
        participant: [senderId, receiverId],
        messages: [messageDocument],
        lastMessage : message
      });

      return res.status(200).json({
        success: true,
        conversation
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
    });
  }
};


