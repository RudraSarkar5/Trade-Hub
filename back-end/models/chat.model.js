import mongoose  from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    content:{
        type : String
    }
    
},{
    timestamps : true
})

const chatSchema = new mongoose.Schema({
  participant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    }
  ],
  messages : [messageSchema]
});

export const chatModel = mongoose.model("Chat",chatSchema);