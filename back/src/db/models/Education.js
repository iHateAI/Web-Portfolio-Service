import { EducationModel } from '../schemas/education';

class Education {
  static async create({ university, major, status, userId }) {
    const createdEducation = await EducationModel.create({
      university,
      major,
      status,
      userId,
    });

    return createdEducation;
  }

  static async findByUserId(userId) {
    const educationData = await EducationModel.find({ userId }).select(
      '_id university major status'
    );
    return educationData;
  }

  static async findByEducationId(educationId) {
    const education = await EducationModel.findOne({ _id: educationId });
    return education;
  }

  static async update({ educationId, newValues }) {
    const filter = { _id: educationId };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select('_id university major status')
      .lean();
    return updatedEducation;
  }

  static async deleteByEducationId(educationId) {
    const deletedEducation = await EducationModel.deleteOne({
      _id: educationId,
    });
    return deletedEducation;
  }
}

export { Education };
