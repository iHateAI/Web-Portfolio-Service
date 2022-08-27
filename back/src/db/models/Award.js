import { AwardModel } from '../schemas/award';

class Award {
  static async create(newAward) {
    console.log('모델' + newAward);
    const createdAward = await AwardModel.create(newAward);
    const { _id, title, detail } = createdAward;
    const resultAward = { _id, title, detail };
    return resultAward;
  }

  static async findByUserId(userId) {
    //console.log('모델' + userId);
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

  static async deleteByAwardId(awardId) {
    const deletedAward = await AwardModel.deleteOne({_id: awardId});
    console.log("모델에서 삭제" + deletedAward);
    return deletedAward;
  }

}

export { Award };
