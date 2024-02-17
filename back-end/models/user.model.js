import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [5, "Name should be at least 5 characters"],
      maxlength: [50, "Name should be at most 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: [5, "Password should be at least 5 characters"],
    },
    avatar: {
      type: String,
      default: "./assets/avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);

export default userModel;
