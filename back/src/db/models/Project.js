import { ProjectModel } from '../schemas/project';

class Project {
  static async create(data) {
    console.log('모델' + data);
    const createdProject = await ProjectModel.create(data);
    const { _id, title, detail, startDate, endDate } = createdProject;
    console.log(createdProject);
    return { _id, title, detail, startDate, endDate };
  }

  static async findByUserId(userId) {
    console.log('모델' + userId);
    const projectData = await ProjectModel.find({ userId }).select(
      '_id title detail startDate endDate'
    );
    console.log(projectData);
    return projectData;
  }

  static async updateByProjectId(data) {
    console.log('모델' + data);
    const { projectId, title, detail, startDate, endDate } = data;
    const modifiedProjectData = await ProjectModel.findOneAndUpdate(
      { _id: projectId },
      {
        title,
        detail,
        startDate,
        endDate,
      },
      { new: true }
    ).select('_id title detail startDate endDate');
    console.log(modifiedProjectData);
    return modifiedProjectData;
  }
}

export { Project };
