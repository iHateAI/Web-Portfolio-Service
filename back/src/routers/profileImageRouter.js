import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import getMulter from '../utils/multer';

const profileImageRouter = Router();

const profileImageUpload = getMulter('src/uploads', 10);

profileImageRouter.put(
  '/:userId',
  login_required,
  profileImageUpload.single('image'),
  async (req, res, next) => {
    const userId = req.params.userId;
    const profileImage = req.file;

    console.log(profileImage);

    if (profileImage) {
      const profileImageUrl = `http://localhost:${process.env.SERVER_PORT}/user/profileImage/${req.file.filename}`;
      res.status(201).send({
        success: true,
        profileImageUrl,
        message: '프로필 이미지 변경 성공',
        path: '/api/profileImage/:userId',
      });
    } else {
      res.status(409).send({
        success: false,
        message: '프로필 이미지 변경 실패 (이미지 파일을 전송받지 못함)',
        path: '/api/profileImage/:userId',
      });
    }
  }
);

export { profileImageRouter };
