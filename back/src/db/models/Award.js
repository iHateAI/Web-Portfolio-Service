import { AwardModel } from '../schemas/award';

class Award {
  static async create(newAward) {
    console.log('모델' + newAward);
    const createdAward = await AwardModel.create(newAward);
    return createdAward;
  }

  static async findByUserId(userId) {
    console.log('모델' + userId);
    const awardData = await AwardModel.find({ userId }).select(
      '_id title detail'
    );
    console.log(awardData);
    return awardData;
  }

  static async updateByAwardId(data) {
    console.log('모델' + data);
    const { awardId, title, detail } = data;
    const modifiedAwardData = await AwardModel.findOneAndUpdate(
      { _id: awardId },
      {
        title,
        detail,
      },
      { new: true }
    ).select('_id title detail');
    console.log(modifiedAwardData);
    return modifiedAwardData;
  }
}

export { Award };
