import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCard2({ user, setIsEditing, isEditable, isNetwork }) {
    const [isHover, setIsHover] = useState(false);

    const navigate = useNavigate();

    const handlerMouseEnter = () => {
        setIsHover(true);
    };

    const handlerMouseLeave = () => {
        setIsHover(false);
    };

    const handlerEditClick = () => {
        setIsEditing(true);
    };

    const handlerPortfolioClick = () => {
        if (!isNetwork) return;
        navigate(`/users/${user.id}`);
    };

    // UserInformation Component
    // 여기서만 한 번 쓰고 사용하지 않음.
    // jsx 부분의 코드 길이가 길어지므로 이렇게 사용.
    const UserInformation = () => {
        return (
            <div style={itemInfoStyle(isHover)}>
                <h3 style={titleStyle}>{user?.name}</h3>
                <h3 style={titleStyle}>{user?.email}</h3>
                <span style={desStyle}>{user?.description}</span>
                {isEditable && (
                    <button style={buttonStyle} onClick={handlerEditClick}>
                        EDIT
                    </button>
                )}
            </div>
        );
    };

    return (
        <div
            style={itemBox}
            onMouseEnter={handlerMouseEnter}
            onMouseLeave={handlerMouseLeave}
        >
            <div style={itemWrap} onClick={handlerPortfolioClick}>
                <UserInformation />
                <img
                    style={imgStyle(isHover)}
                    src="http://placekitten.com/350/350"
                    alt="userImg"
                />
            </div>
        </div>
    );
}

const itemBox = {
    display: "inline-block",
    border: "none",
    marginBottom: "30px",
};

const itemWrap = {
    display: "block",
    position: "relative",
    overflow: "hidden",
    transition: "0.3s",
};

const itemInfoStyle = (isHover) => {
    return {
        position: "absolute",
        top: "50%",
        width: "100%",
        textAlign: "center",
        zIndex: 3,
        color: "#fff",
        transform: isHover && "translateY(-50%)",
        visibility: isHover ? "visible" : "hidden",
        transition: "0.3s all ease",
    };
};

const titleStyle = {
    fontSize: "1.8rem",
    top: 0,
    bottom: 0,
};

const desStyle = {
    fontSize: "1.2rem",
};

const buttonStyle = {
    padding: "8px 13px 8px 13px",
    border: "none",
};

const imgStyle = (isHover) => {
    return {
        transition: "0.3s transform ease",
        transform: isHover ? "scale(1.05)" : "scale(1)",
        filter: isHover ? "brightness(70%)" : "brightness(100%)",
    };
};

export default UserCard2;
