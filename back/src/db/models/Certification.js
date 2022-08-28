import { CertificationModel } from '../schemas/certification';

class Certification {
  static async create({ title, detail, certificationDate, userId }) {
    const createdCertification = await CertificationModel.create({
      title,
      detail,
      certificationDate,
      userId,
    });
    // const { _id, title, detail, certificationDate } = createdCertification;
    // return { _id, title, detail, certificationDate };
    return createdCertification;
  }

  static async findByUserId(userId) {
    const certificationData = await CertificationModel.find({ userId })
      .select('_id title detail certificationDate')
      .lean();
    return certificationData;
  }

  static async findByCertificationId(certificationId) {
    const certification = await CertificationModel.findOne({
      _id: certificationId,
    });
    return certification;
  }

  static async update({ certificationId, newValues }) {
    // const { certificationId, title, detail, certificationDate } = data;
    // const modifiedCertificationData = await CertificationModel.findOneAndUpdate(
    //   { _id: certificationId },
    //   {
    //     title,
    //     detail,
    //     certificationDate,
    //   },
    //   { new: true }
    // ).select('_id title detail certificationDate');
    // return modifiedCertificationData;

    const filter = { _id: certificationId };
    const option = { returnOriginal: false };

    const updatedCertification = await CertificationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select('_id title detail certificationDate')
      .lean();

    return updatedCertification;
  }

  static async deleteByCertificationId(certificationId) {
    const deletedCertification = await CertificationModel.deleteOne({
      _id: certificationId,
    });
    return deletedCertification;
  }
}

export { Certification };
