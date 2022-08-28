import { Project } from '../db';
import dateToString from '../utils/dateObjToString';

class projectService {
  static async addProjectInfo({ title, detail, startDate, endDate, userId }) {
    const project = await Project.create({
      title,
      detail,
      startDate,
      endDate,
      userId,
    });

    project.startDate = dateToString(project.startDate);
    project.endDate = dateToString(project.endDate);

    return project;
  }

  static async getProjectInfo(userId) {
    let projects = await Project.findByUserId(userId);

    if (projects.length < 1) {
      throw new Error('프로젝트 정보가 존재하지 않습니다.');
    }

    projects = projects.map((project) => {
      project.startDate = dateToString(project.startDate);
      project.endDate = dateToString(project.endDate);
      return project;
    });

    return projects;
  }

  static async setProjectInfo({ projectId, toUpdate }) {
    const hasProject = await Project.findByProjectId(projectId);


    if (!hasProject) {
      throw new Error('projectId에 대응하는 데이터가 존재하지 않습니다.');
    }

    const { title, detail, startDate, endDate } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(detail && { detail }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    const project = await Project.update({ projectId, newValues });
    project.startDate = dateToString(project.startDate);
    project.endDate = dateToString(project.endDate);

    return project;
  }

  static async deleteProjectInfo(projectId) {
    const project = await Project.deleteByProjectId(projectId);
    if (project.deletedCount < 1) {
      throw new Error('존재하지 않는 도큐먼트입니다.');
    }
    return project.deletedCount;
  }
}

export { projectService };
