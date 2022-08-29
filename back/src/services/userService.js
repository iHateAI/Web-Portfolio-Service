import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Like } from "../db/models/Like";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    console.log(toUpdate.email);

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      // 이메일 중복 체크
      const hasEmail = await User.findByEmail({ email: toUpdate.email });

      if (hasEmail) {
        throw new Error("이미 존재하는 이메일입니다.");
      }

      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = bcrypt.hash(toUpdate.password, 10);
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    return user;
  }

  static async setUserPassword({ user_id, password }) {
    let user = await User.findById({ user_id });

    if (!user) {
      throw new Error("가입되지 않은 유저입니다.");
    }

    const fieldToUpdate = "password";
    const newValue = await bcrypt.hash(password, 10);
    user = await User.update({ user_id, fieldToUpdate, newValue });

    return user;
  }

  static async setUserProfileImage({ userId, profileImage }) {
    const profileImageUrl = `http://localhost:${process.env.SERVER_PORT}/user/profileImage/${profileImage.filename}`;
    const fieldToUpdate = "profileImageUrl";
    const newValue = profileImageUrl;

    const user = await User.update({
      user_id: userId,
      fieldToUpdate,
      newValue,
    });

    return user;
  }

  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
  /*
   * setLike()
   * 좋아요 기능 설정
   */
  static async setLike({ currentUserId, otherUserId }) {
    // 각각의 입력 받은 아이디가 db에 존재하는지 확인/오류 처리
    const currentUser = await User.findById({ user_id: currentUserId });
    const otherUser = await User.findById({ user_id: otherUserId });
    console.log(currentUser.id, otherUser.id);

    if (!currentUser) {
      const errorMessage =
        "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (!otherUser) {
      const errorMessage =
        "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 두 유저가 서로 좋아요 관계라면 좋아요 객체를 리턴하고, 아니면 null 리턴
    const isLiked = await Like.findByUser({ currentUser, otherUser });
    let updatedLike = {};
    let updatedUser = {};

    // 좋아요 객체가 있다면 -> likeCount 1감소(왜? 좋아요 버튼을 클릭한 시점에 이미 좋아요 관계니깐 좋아요 취소라는 의미) -> status는 false -> 좋아요를 받은 user 정보 갱신 -> 두 유저의 좋아요 객체 삭제
    if (isLiked) {
      let fieldToUpdate = "likeCount";
      let newValue = otherUser.likeCount - 1;
      if (newValue < 0) {
        newValue = 0;
      }
      const newStatus = false;
      const newLike = currentUser.name;
      updatedUser = await User.updateLikeStatus({
        user_id: otherUserId,
        fieldToUpdate,
        value: newValue,
      });
      fieldToUpdate = "status";
      updatedUser = await User.updateLikeStatus({
        user_id: otherUserId,
        fieldToUpdate,
        value: newStatus,
      });
      updatedUser = await User.updateLikeListDel({
        user_id: otherUserId,
        value: newLike,
      });
      await Like.deleteById({ isLiked });
      updatedLike = { status: false, likeCount: updatedUser.likeCount };
    } // null 이라면 -> likeCount 1증가-> status는 True -> 좋아요를 받은 user 정보 갱신 -> 두 유저의 좋아요 객체 생성
    else {
      let fieldToUpdate = "likeCount";
      let newValue = otherUser.likeCount + 1;
      if (newValue < 0) {
        newValue = 0;
      }
      const newStatus = true;
      const newLike = currentUser.name;
      updatedUser = await User.updateLikeStatus({
        user_id: otherUserId,
        fieldToUpdate,
        value: newValue,
      });
      fieldToUpdate = "status";
      updatedUser = await User.updateLikeStatus({
        user_id: otherUserId,
        fieldToUpdate,
        value: newStatus,
      });
      updatedUser = await User.updateLikeListPush({
        user_id: otherUserId,
        value: newLike,
      });
      await Like.create({ currentUser, otherUser });
      updatedLike = { status: true, likeCount: updatedUser.likeCount };
    }
    // console.log("updatedUser :", updatedUser);
    // 반환 : 현재 상태를 나타내는 status와 likeCount 반환 / user의 status/likeCount 정보 갱신
    return updatedLike;
  }

  /*
   * getLike()
   * 좋아요 수 반환
   */
  static async getLike({ currentUserId, otherUserId }) {
    // 입력 받은 아이디가 db에 존재하는지 확인/오류 처리
    const currentUser = await User.findById({ user_id: currentUserId });
    const otherUser = await User.findById({ user_id: otherUserId });

    let updatedLike = {};

    if (!currentUser) {
      const errorMessage =
        "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (!otherUser) {
      const errorMessage =
        "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const isLiked = await Like.findByUser({ currentUser, otherUser });
    if (isLiked) {
      updatedLike = { userStatus: true };
    } else {
      updatedLike = { userStatus: false };
    }
    return updatedLike;
  }
}

export { userAuthService };
