import { Award } from '../db';

class awardService {
  static async addAwardInfo(data) {
    console.log('서비스', data);
    const award = await Award.create(data);
    return award;
  }

  static async getAwardInfo(userId) {
    //console.log('서비스' + userId);
    const award = await Award.findByUserId(userId);
    if (!award) {
      const error = new Error('수상 이력 정보가 존재하지 않습니다.');
      return { error };
    }
    return award;
  }

  static async setAwardInfo(data) {
    console.log('서비스' + data);
    const award = await Award.updateByAwardId(data);
    return award;
  }

}

export { awardService };
