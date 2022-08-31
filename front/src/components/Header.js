import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import Storage from "../storage/storage";

function HeaderTest() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const menuItems = [
    {
      name: "Mypage",
      handlerMenuClick: () => navigate("/"),
    },
    {
      name: "Network",
      handlerMenuClick: () => navigate("/network"),
    },
  ];

  const logout = () => {
    Storage.removeItem();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <React.Fragment>
      <div>
        <div className={`navmenu ${open ? "active" : ""}`}>
          <div className="navmenu-container">
            <div className="menu">
              <ul className="menu-list">
                {menuItems.map((menu) => (
                  <li key={menu.name} onClick={menu.handlerMenuClick}>
                    {menu.name}
                  </li>
                ))}
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
                <Link to="#">{userState.user.email}</Link>
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
    </React.Fragment>
  );
}

export default HeaderTest;
