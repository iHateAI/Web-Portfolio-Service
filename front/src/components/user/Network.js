import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import UserCard2 from "./UserCard2";
import { UserStateContext } from "../../App";

const shuffle = (array) => {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const targetIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[targetIndex]] = [
      array[targetIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [ioTarget, setIoTarget] = useState(null);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("api", "userlist").then((res) => {
      const data = res.data.data;
      const userArr = [];
      data.forEach((v) => {
        const image =
          v.profileImageUrl || `${process.env.PUBLIC_URL}/images/profile.PNG`;
        userArr.push({ ...v, profileImageUrl: image });
      });
      setUsers(shuffle(userArr));
    });
  }, [userState, navigate]);

  useEffect(() => {
    let io;
    let page = 3;
    if (ioTarget) {
      const pageControll = (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (page * 3 >= users.length) setPagedUsers([...users]);
            else {
              setPagedUsers([...users.slice(0, page * 3)]);
              page++;
            }
            observer.observe(entry.target);
          }
        });
      };
      io = new IntersectionObserver(pageControll, {
        threshold: 1,
      });
      io.observe(ioTarget);
    }
    return () => io && io.disconnect();
  }, [ioTarget, users]);

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
            {pagedUsers.map((user) => (
              <UserCard2 key={user.id} user={user} isNetwork />
            ))}
          </div>
          <div ref={setIoTarget}>...Loading</div>
        </div>
      </section>
    </div>
  );
}

export default Network;
