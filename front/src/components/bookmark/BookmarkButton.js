import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import * as DB from "./testdb";

const BookmarkButton = ({ user }) => {
  const userState = useContext(UserStateContext);
  const [toggleBookmark, setToggleBookmark] = useState(false);

  const loginUserId = userState.user.id;
  const userCardId = user.id;

  const setInitialToggleBookmark = async () => {
    // const res = DB.get(loginUserId);
    // if (!res) return;
    // if (res.includes(userCardId)) {
    //   setToggleBookmark(true);
    // } else {
    //   setToggleBookmark(false);
    // }
    // console.log("cardId: ", userCardId);
    // console.log("res: ", res);

    const res = await Api.get(`users/bookmarks/${loginUserId}`);
    const bookmarks = res.data;

    console.log("bookmarks: ", bookmarks);
    if (!bookmarks) return;

    if (bookmarks.includes(userCardId)) {
      setToggleBookmark(true);
    } else {
      setToggleBookmark(false);
    }
  };

  useEffect(() => {
    setInitialToggleBookmark();
  }, []);

  console.log("ToggleBookmark: ", userCardId, ": ", toggleBookmark);

  const handleToggleBookmark = async () => {
    if (toggleBookmark === true) {
      // DB.remove(loginUserId, userCardId);
      await Api.put(`users/bookmarks/${loginUserId}?bookmark=remove`, {
        bookmarkId: userCardId,
      });
      setToggleBookmark(false);
      return;
    }

    // DB.push(loginUserId, userCardId);
    await Api.put(`users/bookmarks/${loginUserId}?bookmark=add`, {
      bookmarkId: userCardId,
    });
    setToggleBookmark(true);
  };

  return (
    <>
      {userState.user.id !== user.id && (
        <button
          onClick={handleToggleBookmark}
          style={{
            fontSize: "30px",
            color: "navy",
            border: "none",
            backgroundColor: "white",
          }}
        >
          {toggleBookmark ? "★" : "☆"}
        </button>
      )}
    </>
  );
};

export default BookmarkButton;
