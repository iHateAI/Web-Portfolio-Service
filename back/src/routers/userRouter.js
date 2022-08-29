import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import getMulter from '../utils/multer';

const userAuthRouter = Router();

// 프로필 이미지에 변경 대한 multer
const profileImageUpload = getMulter('src/uploads', 10);

userAuthRouter.post('/api/user/register', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).send({
      success: true,
      message: '유저 등록 성공',
      apiPath: '[POST] /api/user/register',
      data: newUser,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: '[POST] /api/user/register',
    });
  }
});

userAuthRouter.post('/api/user/login', async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send({
      success: true,
      message: '로그인 성공',
      apiPath: '[POST] /api/user/login',
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: '[POST] /api/user/login',
    });
  }
});

userAuthRouter.get(
  '/api/userlist',
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();

      res.status(200).send({
        success: true,
        message: '전체 유저 목록 불러오기 성공',
        apiPath: '[GET] /api/userlist',
        data: users,
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[GET] /api/userlist',
      });
    }
  }
);

userAuthRouter.get(
  '/api/user/current',
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send({
        success: true,
        message: '유저 정보 불러오기 성공',
        apiPath: '[GET] /api/user/current',
        data: currentUserInfo,
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[GET] /api/user/current',
      });
    }
  }
);

userAuthRouter.put(
  '/api/users/:id',
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      //const password = req.body.password ?? null;
      
      const description = req.body.description ?? null;

      const toUpdate = { name, email, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).send({
        success: true,
        message: '유저 정보 업데이트 성공',
        apiPath: '[PUT] /api/users/:userId',
        data: updatedUser,
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[PUT] /api/users/:userId',
      });
    }
  }
);

userAuthRouter.get(
  '/api/users/:id',
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send({
        success: true,
        message: '유저 정보 불러오기 성공',
        apiPath: '[GET] /api/users/:id',
        data: currentUserInfo,
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[GET] /api/users/:id',
      });
    }
  }
);

userAuthRouter.put(
  '/api/users/password/:userId',
  login_required,
  async (req, res, next) => {
    try {
      const user_id = req.params.userId;
      const password = req.body.password;

      const updatedUser = await userAuthService.setUserPassword({ user_id, password });

      res.status(201).send({
        success: true,
        message: '비밀번호 변경 성공',
        apiPath: '[PUT] /api/user/password/:userId',
        data: updatedUser,
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[PUT] /api/user/password/:userId',
      });
    }
  }
);

userAuthRouter.put(
  '/api/users/profileImage/:userId',
  login_required,
  profileImageUpload.single('image'),
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const profileImage = req.file;

      if (!profileImage) {
        throw new Error('이미지 파일을 전송받지 못했습니다.');
      }

      const updatedUser = await userAuthService.setUserProfileImage({
        userId,
        profileImage,
      });

      res.status(201).send({
        success: true,
        updatedUser,
        message: '프로필 이미지 변경 성공',
        apiPath: '[PUT] /api/users/profileImage/:userId',
      });
    } catch (err) {
      res.status(409).send({
        success: false,
        message: err.message,
        apiPath: '[PUT] /api/users/profileImage/:userId',
      });
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get('/afterlogin', login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
