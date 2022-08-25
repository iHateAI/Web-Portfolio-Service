import { Certification } from '../db';
import dateToString from '../utils/dateObjToString';

class certificationService {
  static async addCertificationInfo(data) {
    console.log('서비스', data);

    /**
     * String으로 바꿔주는 로직은 다시 작성하기
     */
    const certification = await Certification.create(data);

    certification.certificationDate = dateToString(
      certification.certificationDate
    );

    return certification;
  }

  static async getCertificationInfo(userId) {
    console.log('서비스' + userId);
    /**
     * String으로 바꿔주는 로직은 다시 작성하기
     */
    const results = await Certification.findByUserId(userId);
    if (!results) {
      const error = new Error('자격증 정보가 존재하지 않습니다.');
      return { error };
    } else {
      const certifications = results.map((result) => {
        const tempObj = { ...result._doc };
        tempObj.certificationDate = dateToString(tempObj.certificationDate);
        return tempObj;
      });
      return certifications;
    }
  }

  static async setCertificationInfo(data) {
    console.log('서비스' + data);
    /**
     * String으로 바꿔주는 로직은 다시 작성하기
     */
    const result = await Certification.updateByCertificationId(data);
    
    const certification = result._doc;
    certification.certificationDate = dateToString(certification.certificationDate);

    return certification;
  }
}

export { certificationService };
