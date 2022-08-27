import { EducationModel } from '../schemas/education';

class Education {
  static async create(newEducation) {
    console.log('모델' + newEducation);
    const createdEducation = await EducationModel.create(newEducation);
    const { _id, university, major, status } = createdEducation;
    const resultEducation = { _id, university, major, status };
    return resultEducation;
  }

  static async findByUserId(userId) {
    console.log('모델' + userId);
    const educationData = await EducationModel.find({ userId }).select(
      '_id university major status'
    );
    console.log(educationData);
    return educationData;
  }

  static async updateByEducationId(data) {
    console.log('모델' + data);
    const { educationId, university, major, status } = data;
    const modifiedEducationData = await EducationModel.findOneAndUpdate(
      { _id: educationId },
      {
        university,
        major,
        status,
      },
      { new: true }
    ).select('_id userId university major status');
    console.log(modifiedEducationData);
    return modifiedEducationData;
  }

  static async deleteByEducationId(educationId) {
    const deletedEducation = await EducationModel.deleteOne({_id: educationId});
    console.log("모델에서 삭제" + deletedEducation);
    return deletedEducation;
  }

}

export { Education };
