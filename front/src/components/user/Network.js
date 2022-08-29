import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import UserCard2 from "./UserCard2";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("api/userlist").then((res) => {
      const data = res.data.data;
      const userArr = [];
      data.forEach((v) => {
        const image =
          v.profileImageUrl || `${process.env.PUBLIC_URL}/images/profile.PNG`;
        userArr.push({ ...v, profileImageUrl: image });
      });
      setUsers(userArr);
    });
  }, [userState, navigate]);

  return (
    <div className="network-container">
      <section className="section network-content">
        <div className="title-container">
          <h2 className="network-title">Hey, I'm Johan Stanworth</h2>
          <p className="network-sub-title">
            Freelance Creative &amp; Professional Graphics Designer
          </p>
        </div>
        <div className="usercard-container">
          <div className="usercard">
            {users.map((user) => (
              <UserCard2 key={user.id} user={user} isNetwork />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Network;
