import { Schema, model } from 'mongoose';

const CertificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    certificationDate: {
      type: Date,
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

const CertificationModel = model('Certification', CertificationSchema);

export { CertificationModel };
