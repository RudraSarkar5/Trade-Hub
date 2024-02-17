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
    location: {
      type: String,
    },
    avatar: {
      secure_url: {
        type: String,
        default: "./assets/avatar.png"
      },
      pubilc_id : {
        type : String,

      }
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);

export default userModel;
