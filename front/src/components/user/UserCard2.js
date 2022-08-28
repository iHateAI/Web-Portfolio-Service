import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../bookmark/BookmarkButton";

function UserCard2({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const handlerEditClick = () => {
    setIsEditing(true);
  };

  const handlerPortfolioClick = () => {
    if (!isNetwork) return;
    navigate(`/users/${user.id}`);
  };

  // UserInformation Component
  // 여기서만 한 번 쓰고 사용하지 않음.
  // jsx 부분의 코드 길이가 길어지므로 이렇게 사용.
  const UserInformation = () => {
    return (
      <div className="network-item-info">
        <h3 className="user-title">{user?.name}</h3>
        <h3 className="user-email">{user?.email}</h3>
        <span className="user-descriptiom">{user?.description}</span>
        {isEditable && (
          <button className="button-style" onClick={handlerEditClick}>
            EDIT
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="item-box">
      <div className="item-wrap" onClick={handlerPortfolioClick}>
        <UserInformation />
        <img
          className="item-img-style"
          // src='https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_1280.png'
          src={user.profileUrl}
          alt="userImg"
        />
      </div>
      <BookmarkButton user={user} />
    </div>
  );
}

export default UserCard2;
