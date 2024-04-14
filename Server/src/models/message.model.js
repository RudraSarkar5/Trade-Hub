import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
    },
    chatId: {
      type: mongoose.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  }
);


const messageModel = mongoose.model("message", messageSchema);
export default messageModel;
