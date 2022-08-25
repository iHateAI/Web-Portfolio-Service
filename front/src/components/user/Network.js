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
        Api.get("userlist").then((res) => {
            const data = res.data;
            const userArr = [];
            data.forEach((v) => {
                const image =
                    v.profileUrl ||
                    `${process.env.PUBLIC_URL}/images/profile.PNG`;
                userArr.push({ ...v, profileUrl: image });
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
