import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import * as DB from "./testdb";

const BookmarkButton = ({ user }) => {
  const userState = useContext(UserStateContext);
  const [toggleBookmark, setToggleBookmark] = useState(false);

  const loginUserId = userState.user.id;
  const userCardId = user.id;

  const setInitialToggleBookmark = () => {
    const res = DB.get(loginUserId);

    if (!res) return;

    if (res.includes(userCardId)) {
      setToggleBookmark(true);
    } else {
      setToggleBookmark(false);
    }
    console.log("cardId: ", userCardId);
    console.log("res: ", res);
  };

  useEffect(() => {
    setInitialToggleBookmark();
  }, []);

  console.log("ToggleBookmark: ", toggleBookmark);

  const handleToggleBookmark = () => {
    if (toggleBookmark == true) {
      DB.remove(loginUserId, userCardId);
      setToggleBookmark(false);
      return;
    }
    DB.push(loginUserId, userCardId);
    setToggleBookmark(true);
  };

  return (
    <>
      {userState.user.id !== user.id && (
        <button
          onClick={handleToggleBookmark}
          style={{ fontSize: "30px", color: "green" }}
        >
          {toggleBookmark ? "★" : "☆"}
        </button>
      )}
    </>
  );
};

export default BookmarkButton;
