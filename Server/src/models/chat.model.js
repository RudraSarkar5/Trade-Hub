import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    unRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chat",friendSchema);

export default chatModel;