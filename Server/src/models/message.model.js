import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const chatModel = mongoose.model("message", chatSchema);
export default chatModel;
