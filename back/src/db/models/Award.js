import { AwardModel } from '../schemas/award';

class Award {
  static async create({ title, detail, userId }) {
    const createdAward = await AwardModel.create({ title, detail, userId });
    // const { _id, title, detail } = createdAward;
    // return { _id, title, detail };
    return createdAward;
  }

  static async findByUserId(userId) {
    const awardData = await AwardModel.find({ userId }).select(
      '_id title detail'
    );
    return awardData;
  }

  static async findByAwardId(awardId) {
    const award = await AwardModel.findOne({ _id: awardId });
    return award;
  }

  static async update({ awardId, newValues }) {
    const filter = { _id: awardId };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select('_id title detail')
      .lean();

    return updatedAward;

    // console.log('모델' + data);
    // const { awardId, title, detail } = data;
    // const modifiedAwardData = await AwardModel.findOneAndUpdate(
    //   { _id: awardId },
    //   {
    //     title,
    //     detail,
    //   },
    //   { new: true }
    // ).select('_id title detail');
    // console.log(modifiedAwardData);
    // return modifiedAwardData;
  }

  static async deleteByAwardId(awardId) {
    const deletedAward = await AwardModel.deleteOne({ _id: awardId });
    return deletedAward;
  }
}

export { Award };
