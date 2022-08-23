import { CertificationModel } from '../schemas/certification';

class Certification {
  static async create(data) {
    console.log('모델' + data);
    const createdCertification = await CertificationModel.create(data);
    const { _id, title, detail, certificationDate } = createdCertification;
    /**
     * 이부분도 fix 예정
     */
    return { _id, title, detail, certificationDate };
  }

  static async findByUserId(userId) {
    console.log('모델' + userId);
    const certificationData = await CertificationModel.find({ userId }).select(
      '_id title detail certificationDate'
    );
    console.log(certificationData);
    return certificationData;
  }

  static async updateByCertificationId(data) {
    console.log('모델' + data);
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
    console.log(modifiedCertificationData);
    return modifiedCertificationData;
  }
}

export { Certification };
