import { Router } from 'express';
import { certificationService } from '../services/certificationService';
import { login_required } from '../middlewares/login_required';

const certificationRouter = Router();

// 자격증 정보 추가 라우터
certificationRouter.post('/', login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    
    const data = { ...req.body, userId };
    const registeredCertification =
      await certificationService.addCertificationInfo(data);

    res.status(200).send(registeredCertification);
  } catch (err) {
    next(err);
  }
});

// 자격증 정보 조희 라우터
certificationRouter.get('/', login_required, async (req, res, next) => {
  try {
    const userId = req.query.userId ? req.query.userId : req.currentUserId;
    const certification = await certificationService.getCertificationInfo(
      userId
    );
    if (certification.error) {
      console.log(certification.error.message);
      throw certification.error;
    }
    res.status(200).send(certification);
  } catch (err) {
    next(err);
  }
});

// 자격증 정보 수정 라우터
certificationRouter.put('/:certificationId', login_required, async (req, res, next) => {
  try {
    const { certificationId } = req.params;
    const data = { ...req.body, certificationId };
    const modifiedCertification =
      await certificationService.setCertificationInfo(data);

    res.status(200).send(modifiedCertification);
  } catch (err) {
    next(err);
  }
});

export { certificationRouter };
