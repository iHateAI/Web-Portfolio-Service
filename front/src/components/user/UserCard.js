import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import UserModal from "../modal/UserModal";
import UserImageProfileUpload from "./UserImageProfile";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const navigate = useNavigate();

  const handlerEditClick = () => {
    setIsEditing(true);
  };

  const handlerPortfolioClick = () => {
    if (!isNetwork) return;
    navigate(`/users/${user.id}`);
  };

  const handleImgClick = () => {
    onShowButtonClickEventHandler(true);
  };

  const handleImageUpload = async (uploadedImage) => {
    const res = fetchUpdaeUserImage.call(this, uploadedImage, user);
    // 서버 API가 수정이 완료되면 기능을 완성하도록 합니다.
    console.log(res);
  };

  // UserInformation Component
  // 여기서만 한 번 쓰고 사용하지 않음.
  // jsx 부분의 코드 길이가 길어지므로 이렇게 사용.
  const UserInformation = () => {
    return (
      <div className="single-user-item-info">
        <h3 className="user-name">{user?.name}</h3>
        <p className="user-email">
          <span>{user?.email}</span>
        </p>
        <div className="user-description">
          <p>{user?.description}</p>
        </div>
        <h4 className="skill-title">What I did</h4>
        <ul className="skill-list">
          <li>Design</li>
          <li>HTML5/CSS3</li>
          <li>CMS</li>
          <li>Logo</li>
        </ul>

        {isEditable && (
          <button className="edit-button" onClick={handlerEditClick}>
            EDIT
          </button>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="singlepage-item-box">
        <div className="item-wrap" onClick={handlerPortfolioClick}>
          <div onClick={handleImgClick}>
            <img className="item-img" src={user?.profileUrl} alt="userImg" />
          </div>
          <UserInformation />
        </div>
      </div>
      <UserModal
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      >
        <UserImageProfileUpload
          user={user}
          onChangeImageUploadEvent={handleImageUpload}
        />
      </UserModal>
    </React.Fragment>
  );
}

async function fetchUpdaeUserImage(uploadedImg, user) {
  const formData = new FormData();
  formData.append("image", uploadedImg);
  const res = await Api.imageUpload(`users/${user.id}`, formData);
  return res.data;
}

export default UserCard;
