import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
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
    <div className="singlepage-item-box">
      <div className="item-wrap" onClick={handlerPortfolioClick}>
        <div>
          <img
            className="item-img"
            src="https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_1280.png"
            alt="userImg"
          />
        </div>

        <UserInformation />
      </div>
    </div>
  );
}

export default UserCard;
