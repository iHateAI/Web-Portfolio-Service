import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/app.css";

function UserCard2({ user, setIsEditing, isEditable, isNetwork }) {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const handlerMouseEnter = () => {
    setIsHover(true);
  };

  const handlerMouseLeave = () => {
    setIsHover(false);
  };

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
      <div className="item-info-style">
        <h3 className="title-style">{user?.name}</h3>
        <h3 className="title-style">{user?.email}</h3>
        <span className="des-style">{user?.description}</span>
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
          src="http://placekitten.com/350/350"
          alt="userImg"
        />
      </div>
    </div>
  );
}

export default UserCard2;
