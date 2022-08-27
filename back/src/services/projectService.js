import { Project } from '../db';
import dateToString from '../utils/dateObjToString';

class projectService {
  static async addProjectInfo(data) {
    console.log('서비스', data);
    /**
     * String으로 바꿔주는 로직은 다시 작성하기
     */
    const project = await Project.create(data);

    project.startDate = dateToString(project.startDate);
    project.endDate = dateToString(project.endDate);

    return project;
  }

  static async getProjectInfo(userId) {
    console.log('서비스', userId);
    /**
     * String으로 바꿔주는 로직은 다시 작성하기
     */
    const results = await Project.findByUserId(userId);
    if (!results) {
      const error = new Error('프로젝트 정보가 존재하지 않습니다.');
      return { error };
    } else {
      const projects = results.map((result) => {
        const tempObj = { ...result._doc };
        tempObj.startDate = dateToString(tempObj.startDate);
        tempObj.endDate = dateToString(tempObj.endDate);
        return tempObj;
      });
      return projects;
    }
  }

  static async setProjectInfo(data) {
    console.log('서비스' + data);
    /**
     * String으로 바꿔주는 로직은 다시 작성하기
     */
    const result = await Project.updateByProjectId(data);

    const project = result._doc;
    project.startDate = dateToString(project.startDate);
    project.endDate = dateToString(project.endDate);

    return project;
  }

  static async deleteProjectInfo(projectId) {
    const project = await Project.deleteByProjectId(projectId);
    return project.deletedCount;
  }
}

export { projectService };
