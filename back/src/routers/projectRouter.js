import { Router } from 'express';
import { projectService } from '../services/projectService';
import { login_required } from '../middlewares/login_required';

const projectRouter = Router();

// 프로젝트 이력 추가 라우터
projectRouter.post('/', login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const data = { ...req.body, userId };
    const registeredProject = await projectService.addProjectInfo(data);

    res.status(200).send(registeredProject);
  } catch (err) {
    next(err);
  }
});

// 프로젝트 이력 조회 라우터
projectRouter.get('/', login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
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
projectRouter.put('/:projectId', login_required, async (req, res, next) => {
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
