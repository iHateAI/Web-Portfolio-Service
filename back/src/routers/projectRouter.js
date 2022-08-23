import { Router } from 'express';
import { projectService } from '../services/projectService';

const projectRouter = Router();

// 프로젝트 이력 추가 라우터
projectRouter.post('/', async (req, res, next) => {
  try {
    const userId = 'ad7ff66b-f2ad-4729-b640-3c23d074f56f';

    const data = { ...req.body, userId };
    const registeredProject = await projectService.addProjectInfo(data);

    res.status(200).send(registeredProject);
  } catch (err) {
    next(err);
  }
});

// 프로젝트 이력 조회 라우터
projectRouter.get('/', async (req, res, next) => {
  try {
    const userId = 'ad7ff66b-f2ad-4729-b640-3c23d074f56f';
    const project = await projectService.getProjectInfo(userId);
    if (project.error) {
      console.log(project.error.message);
      throw project.error;
    }
    res.status(200).send(project);
  } catch (err) {
    next(err);
  }
});

// 프로젝트 이력 수정 라우터
projectRouter.put('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const data = { ...req.body, projectId };
    const modifiedProject = await projectService.setProjectInfo(data);

    res.status(200).send(modifiedProject);
  } catch (err) {
    next(err);
  }
});

export { projectRouter };
