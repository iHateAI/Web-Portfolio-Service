import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
// import UserCard from "./UserCard";
import UserCard2 from "./UserCard2";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <section className="section site-network">
        <div className="network-content">
          <h2 className="network-title">Hey, I'm Johan Stanworth</h2>
          <p className="network-sub-title">
            Freelance Creative &amp; Professional Graphics Designer
          </p>
        </div>

        <Row xs="auto" className="jusify-content-cente">
          {users.map((user) => (
            <UserCard key={user.id} user={user} isNetwork />
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default Network;
