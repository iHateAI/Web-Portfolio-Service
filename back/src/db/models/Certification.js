import { CertificationModel } from '../schemas/certification';

class Certification {
  static async create(data) {
    const createdCertification = await CertificationModel.create(data);
    const { _id, title, detail, certificationDate } = createdCertification;
    /**
     * 이부분도 fix 예정
     */
    return { _id, title, detail, certificationDate };
  }

  static async findByUserId(userId) {
    const certificationData = await CertificationModel.find({ userId }).select(
      '_id title detail certificationDate'
    );
    return certificationData;
  }

  static async updateByCertificationId(data) {
    const { certificationId, title, detail, certificationDate } = data;
    const modifiedCertificationData = await CertificationModel.findOneAndUpdate(
      { _id: certificationId },
      {
        title,
        detail,
        certificationDate,
      },
      { new: true }
    ).select('_id title detail certificationDate');
    return modifiedCertificationData;
  }

  static async deleteByCertificationId(certificationId) {
    const deletedCertification = await CertificationModel.deleteOne({_id: certificationId});
    return deletedCertification;
  }
}

export { Certification };
