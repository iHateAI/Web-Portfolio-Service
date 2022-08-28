import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const AwardModel = model('Award', AwardSchema);

export { AwardModel };
