import { Education } from '../db';

class educationService {
  static async addEducationInfo({ university, major, status, userId }) {
    return Education.create({ university, major, status, userId });
  }

  static async getEducationInfo(userId) {
    const education = await Education.findByUserId(userId);
    if (education.length < 1) {
      throw new Error('학력 정보가 존재하지 않습니다.');
    }
    return education;
  }

  static async setEducationInfo({ educationId, toUpdate }) {
    const education = await Education.findByEducationId(educationId);

    if (!education) {
      throw new Error('educationId에 대응하는 데이터가 존재하지 않습니다.');
    }

    const { university, major, status } = toUpdate;

    const newValues = {
      ...(university && { university }),
      ...(major && { major }),
      ...(status && { status }),
    };
    return Education.update({ educationId, newValues });
  }

  static async deleteEducationInfo(educationId) {
    const education = await Education.deleteByEducationId(educationId);
    if (education.deletedCount < 1) {
      throw new Error('존재하지 않는 도큐먼트입니다.');
    }
    return education.deletedCount;
  }
}

export { educationService };
