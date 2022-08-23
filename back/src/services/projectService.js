import { Project } from '../db';

class projectService {
  static async addProjectInfo(data) {
    console.log('서비스', data);
    const project = await Project.create(data);
    return project;
  }

  static async getProjectInfo(userId) {
    console.log('서비스', userId);
    const project = await Project.findByUserId(userId);
    if (!project) {
      const error = new Error('프로젝트 정보가 존재하지 않습니다.');
      return { error };
    }
    return project;
  }

  static async setProjectInfo(data) {
    console.log('서비스' + data);
    const project = await Project.updateByProjectId(data);
    return project;
  }
}

export { projectService };
