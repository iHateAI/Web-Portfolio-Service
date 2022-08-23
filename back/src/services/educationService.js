import { Education } from '../db';

class educationService {
  static async addEducationInfo(data) {
    console.log('서비스', data);
    const educationInfo = await Education.create(data);
    return educationInfo;
  }
}

export { educationService };
