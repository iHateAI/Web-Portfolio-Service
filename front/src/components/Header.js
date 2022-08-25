import React, { useContext, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";

function HeaderTest() {
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
      <div flex-container>
        <div className={`navmenu ${open ? "active" : ""}`}>
          <div className="navmenu-container">
            <div className="menu">
              <ul className="menu-list">
                <li onClick={() => navigate("/")}>Mypage</li>
                <li onClick={() => navigate("/network")}>Network</li>
                {isLogin && <li onClick={logout}>Logout</li>}
              </ul>
            </div>
            <div className="content">
              <p>
                <em>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam necessitatibus incidunt ut officiis explicabo
                  inventore. <br />
                </em>
              </p>
            </div>
            <div className="content">
              <h3>Hire Me</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam necessitatibus incidunt ut officiisexplicabo inventore.{" "}
                <br />
                <a href="#">myemail@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="header-navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate("/")}>
            MyPortfolio.
          </div>
          <div
            className={`burger-menu ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderTest;
