import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Api from "../../api";

function UserLikeList({ portfolioOwnerId, user }) {
  const [likeList, setLikeList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setShow(true);

    const res = await Api.get(`api/likelist/${portfolioOwnerId}`);
    setLikeList(res.data.liked);
  };

  return (
    <div className="like-list-container">
      <button onClick={handleClick} className="like-list-button">
        Who Likes?
      </button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Who Likes?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="like-list">
            {likeList.map((user) => (
              <li key={user.name}>
                {user.name}

                <hr />
              </li>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserLikeList;
