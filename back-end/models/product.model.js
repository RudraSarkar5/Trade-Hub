import mongoose, { Schema,model } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    images: [
      {
        secure_url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const productModel = model("product",productSchema);
export default productModel;