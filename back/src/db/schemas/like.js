import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const LikeSchema = new Schema(
  {
    // 좋아요를 누른 user의 ObjectId (loginUser)
    visitedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // 좋아요를 받은 user의 ObjectId (portfolioOwnerUSer)
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
