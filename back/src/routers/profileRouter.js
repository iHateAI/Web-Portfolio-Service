import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const profileRouter = Router();

/**
 * uploads 파일 생성
 */
try {
  fs.readdirSync('src/uploads');
} catch (err) {
  fs.mkdirSync('src/uploads');
}

/**
 * multer 설정
 */
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    // 저장 공간 설정
    done(null, 'src/uploads');
  },
  filename(req, file, done) {
    // 저장될 파일 이름 설정
    const ext = path.extname(file.originalname);
    done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 최종 파일 이름(날짜로 덮어씌우지 못하게)
  },
});

const limits = {
  //최대 용량 10MB (초과하면 404 에러)
  fileSize: 10 * 1024 * 1024, // x * kilo * mega
};

const upload = multer({ storage, limits });

profileRouter.post('/', login_required, upload.single('image'), (req, res) => {
  res.send({ url: `/api/profile/${req.file.filename}` });
}); // 프론트엔드에서 input 태그 name속성값을 image로 해야됨

export { profileRouter };
