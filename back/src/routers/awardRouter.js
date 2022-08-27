import { Router } from 'express';
import { awardService } from '../services/awardService';
import { login_required } from '../middlewares/login_required';

const awardRouter = Router();

// 수상 이력 추가 라우터
awardRouter.post('/', login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const data = { ...req.body, userId };
    const registeredAward = await awardService.addAwardInfo(data);

    res.status(200).send(registeredAward);
  } catch (err) {
    next(err);
  }
});

awardRouter.get('/', login_required, async (req, res, next) => {
  try {
    const userId = req.query.userId ? req.query.userId : req.currentUserId;

    const award = await awardService.getAwardInfo(userId);
    if (award.error) {
      console.log(award.error.message);
      throw award.error;
    }
    res.status(200).send(award);
  } catch (err) {
    next(err);
  }
});

awardRouter.put('/:awardId', login_required, async (req, res, next) => {
  try {
    const { awardId } = req.params;
    const data = { ...req.body, awardId };
    const modifiedAward = await awardService.setAwardInfo(data);

    res.status(200).send(modifiedAward);
  } catch (err) {
    next(err);
  }
});

awardRouter.delete('/:awardId', login_required, async (req, res, next) => {
  try {
    const { awardId } = req.params;
    const deletedCount =
        await awardService.deleteAwardInfo(awardId);
    if (deletedCount > 0) {
      res.status(200).send({
        success: true,
        deletedCount,
        message: '데이터 삭제 성공'
      })
    } else {
      res.status(200).send({
        success: false,
        deletedCount,
        message: '존재하지 않는 도큐먼트'
      })
    }
  } catch (err) {
    next(err);
  }
});

export { awardRouter };
