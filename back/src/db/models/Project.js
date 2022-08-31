import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ title, detail, startDate, endDate, userId }) {
    const createdProject = await ProjectModel.create({
      title,
      detail,
      startDate,
      endDate,
      userId,
    });
    // const { _id, title, detail, startDate, endDate } = createdProject;

    // return { _id, title, detail, startDate, endDate };
    return createdProject;
  }

  static async findByUserId(userId) {
    const projectData = await ProjectModel.find({ userId })
      .select("_id title detail startDate endDate")
      .lean();
    return projectData;
  }

  static async findByProjectId(projectId) {
    const project = await ProjectModel.findOne({
      _id: projectId,
    });
    return project;
  }

  static async update({ projectId, newValues }) {
    // const { projectId, title, detail, startDate, endDate } = data;
    // const modifiedProjectData = await ProjectModel.findOneAndUpdate(
    //   { _id: projectId },
    //   {
    //     title,
    //     detail,
    //     startDate,
    //     endDate,
    //   },
    //   { new: true }
    // ).select('_id title detail startDate endDate');
    // console.log(modifiedProjectData);
    // return modifiedProjectData;

    const filter = { _id: projectId };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select("_id title detail startDate endDate")
      .lean();

    return updatedProject;
  }

  static async deleteByProjectId(projectId) {
    const deletedProject = await ProjectModel.deleteOne({ _id: projectId });
    return deletedProject;
  }
}

export { Project };
