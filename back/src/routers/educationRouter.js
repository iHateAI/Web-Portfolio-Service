import { Router } from 'express';
import { educationService } from '../services/educationService';
import { login_required } from '../middlewares/login_required';

const educationRouter = Router();

// 학력 정보 추가 라우터
educationRouter.post('/', login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const data = { ...req.body, userId };
    const registeredEducation = await educationService.addEducationInfo(data);

    res.status(201).send(registeredEducation);
  } catch (err) {
    next(err);
  }
});

// 학력 정보 조회 라우터
educationRouter.get('/', login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const education = await educationService.getEducationInfo(userId);
    if (education.error) {
      console.log(education.error.message);
      throw education.error;
    }
    res.status(200).send(education);
  } catch (err) {
    next(err);
  }
});

// 학력 정보 수정 라우터
educationRouter.put('/:educationId', login_required, async (req, res, next) => {
  try {
    const { educationId } = req.params;
    const data = { ...req.body, educationId };
    const modifiedEducation = await educationService.setEducationInfo(data);

    res.status(200).send(modifiedEducation);
  } catch (err) {
    next(err);
  }
});

export { educationRouter };
