import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import UserModal from "../modal/UserModal";
import UserImageProfileUpload from "./UserImageProfile";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork, setUser }) {
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
    const res = await fetchUpdaeUserImage.call(this, uploadedImage, user);
    const { success, updatedUser } = res;
    if (success) {
      setUser(updatedUser);
      onCloseButtonClickEventHandler();
    }
  };

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
            <img
              className="item-img"
              src={user?.profileImageUrl}
              alt="userImg"
            />
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
  const res = await Api.imageUpload(
    `api/users/profileImage/${user.id}`,
    formData
  );
  return res.data;
}

export default UserCard;
