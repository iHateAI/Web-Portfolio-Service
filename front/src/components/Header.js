import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { UserStateContext, DispatchContext } from "../App";
import "./style/app.css";

function Header() {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapse in={open}>
        <div className="custom-navmenu" id="main-navbar">
          <Container className="py-md-4">
            <Row className="lign-items-start">
              <Col md={2}>
                <ul className="custom-menu">
                  <li>
                    <Nav.Link onClick={() => navigate("/network")}>
                      My page
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link onClick={() => navigate("/network")}>
                      Network
                    </Nav.Link>
                  </li>
                  {isLogin && (
                    <li>
                      <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </li>
                  )}
                </ul>
              </Col>
              <Col md={6} className="d-none d-md-block mr-auto ">
                <div className="tweet d-flex ">
                  <span className="text-white mt-2 mr-3"></span>
                  <div>
                    <p>
                      <em>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam necessitatibus incidunt ut officiis explicabo
                        inventore. <br />
                      </em>
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="d-none d-md-block">
                <h3>Hire Me</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam necessitatibus incidunt ut officiisexplicabo
                  inventore. <br />
                  <Link to="#">myemail@gmail.com</Link>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </Collapse>
      <Navbar className="custom-navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            MyPortfolio.
          </Navbar.Brand>

          <Link
            to="#"
            className={`burger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
