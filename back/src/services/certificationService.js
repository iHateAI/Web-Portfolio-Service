import { Certification } from '../db';

class certificationService {
  static async addCertificationInfo(data) {
    console.log('서비스', data);
    const certification = await Certification.create(data);

    const tempDate = certification.certificationDate;
    const year = tempDate.getFullYear();
    const month = ('0' + (1 + tempDate.getMonth())).slice(-2);
    const day = ('0' + tempDate.getDate()).slice(-2);

    certification.certificationDate = `${year}-${month}-${day}`;

    return certification;
  }

  static async getCertificationInfo(userId) {
    console.log('서비스' + userId);
    const certification = await Certification.findByUserId(userId);
    if (!certification) {
      const error = new Error('자격증 정보가 존재하지 않습니다.');
      return { error };
    }
    return certification;
  }

  static async setCertificationInfo(data) {
    console.log('서비스' + data);
    const certification = await Certification.updateByCertificationId(data);
    return certification;
  }
}

export { certificationService };
