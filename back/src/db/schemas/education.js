import { Schema, model } from 'mongoose';

const EducationSchema = new Schema(
  {
    university: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model('Education', EducationSchema);

export { EducationModel };
