import { Award } from "../db";

class awardService {
  static async addAwardInfo({ title, detail, userId }) {
    /**
     * 여긴 다시 수정
     */
    const award = await Award.create({ title, detail, userId });

    const _title = award.title;
    const _detail = award.detail;
    const _id = award._id;

    return { title: _title, detail: _detail, _id };
  }

  static async getAwardInfo(userId) {
    const award = await Award.findByUserId(userId);
    if (award.length < 1) return [];
    // {
    //   const error = new Error('수상 이력 정보가 존재하지 않습니다.');
    //   return { error };
    // }
    return award;
  }

  static async setAwardInfo({ awardId, toUpdate }) {
    const award = await Award.findByAwardId(awardId);

    if (!award) {
      throw new Error("awardId에 대응하는 데이터가 존재하지 않습니다.");
    }

    const { title, detail } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(detail && { detail }),
    };

    return Award.update({ awardId, newValues });
  }

  static async deleteAwardInfo(awardId) {
    const award = await Award.deleteByAwardId(awardId);
    if (award.deletedCount < 1) {
      throw new Error("존재하지 않는 도큐먼트입니다.");
    }
    return award.deletedCount;
  }
}

export { awardService };
