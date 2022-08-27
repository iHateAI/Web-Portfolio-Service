import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
// import UserCard from "./UserCard";
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
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [ioTarget, setIoTarget] = useState(null);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => {
      const data = res.data;
      const userArr = [];
      data.forEach((v) => {
        const image =
          v.profileUrl || `${process.env.PUBLIC_URL}/images/profile.PNG`;
        userArr.push({ ...v, profileUrl: image });
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
