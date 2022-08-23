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
      const errorMessage = "학력 데이터가 존재하지 않습니다.";
      return { errorMessage };
    }
    return education;
  }

  static async setEducationInfo(data) {
    console.log('서비스' + data);
    const education = await Education.updateByEducationId(data);
    return education;
  }
}

export { educationService };
