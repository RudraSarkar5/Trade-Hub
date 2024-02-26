import { chatModel } from "../models/chat.model.js"
import UserModel  from "../models/user.model.js"

export const getFriends=async (req,res)=>{

    console.log("enter");
    const userId = req.user._id;

    const allFriendsId = (await chatModel.find({participant : {$in : [userId]}})).flatMap(({participant})=>participant.filter((id)=>id != userId))
    const correspondingFriends = await UserModel.find({
      _id: { $in: allFriendsId }
    });

    return res.status(200).json({
      success: true,
      message: "fetched all friends",
      friends : correspondingFriends
    });
}

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
      await conversation.save();
      return res.status(200).json({
        success: true,
        conversation
      });
    } else {
      // Conversation does not exist, create a new conversation
      conversation = await chatModel.create({
        participant: [senderId, receiverId],
        messages: [messageDocument]
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


