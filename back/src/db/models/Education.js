import { EducationModel } from '../schemas/education';

class Education {
  static async create(newEducation) {
    console.log('모델' + newEducation);
    const createdEducation = await EducationModel.create(newEducation);
    return createdEducation;
  }
}

export { Education };
