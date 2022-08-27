import { Education } from '../db';

class educationService {
  static async addEducationInfo(data) {
    console.log('서비스', data);
    const education = await Education.create(data);
    return education;
  }

  static async getEducationInfo(userId) {
    console.log('서비스' + userId);
    const education = await Education.findByUserId(userId);
    if (!education) {
      const error = new Error('학력 정보가 존재하지 않습니다.');
      return { error };
    }
    return education;
  }

  static async setEducationInfo(data) {
    console.log('서비스' + data);
    const education = await Education.updateByEducationId(data);
    return education;
  }

  static async deleteEducationInfo(educationId) {
    const education = await Education.deleteByEducationId(educationId);
    return education.deletedCount;
  }

}

export { educationService };
