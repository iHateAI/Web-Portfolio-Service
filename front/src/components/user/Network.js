import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
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
        <Row mb={5} className="align-items-center">
          <Col md={12} lg={6} className="mb-4 mb-lg-0">
            <h2 className="network-title">Hey, I'm Johan Stanworth</h2>
            <p className="network-sub-title">
              Freelance Creative &amp; Professional Graphics Designer
            </p>
          </Col>
          <Col md={12} lg={6} className="text-start text-lg-end">
            <div id="filters" class="filters">
              <Link to="#" className="active">
                All
              </Link>
              <Link to="#">Web</Link>
            </div>
          </Col>
        </Row>
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
