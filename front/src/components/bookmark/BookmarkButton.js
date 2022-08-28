import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import * as DB from "./testdb";

const BookmarkButton = ({ user }) => {
  console.log(user);
  const userState = useContext(UserStateContext);
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [bookmarks, setBookmarks] = useState("");

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
    setBookmarks(userState.user.bookmarks);

    if (!bookmarks) return;

    if (bookmarks.includes(userCardId)) {
      setToggleBookmark(true);
    } else {
      setToggleBookmark(false);
    }
  };

  useEffect(() => {
    setInitialToggleBookmark();
  }, [bookmarks, userState]);

  const handleToggleBookmark = async () => {
    if (toggleBookmark === true) {
      // DB.remove(loginUserId, userCardId);
      const res = await Api.put(
        `users/bookmarks/${loginUserId}?bookmark=remove`,
        {
          bookmarkId: userCardId,
        }
      );
      userState.user.bookmarks = res.data;
      setToggleBookmark(false);
      return;
    }

    // DB.push(loginUserId, userCardId);
    const res = await Api.put(`users/bookmarks/${loginUserId}?bookmark=add`, {
      bookmarkId: userCardId,
    });
    userState.user.bookmarks = res.data;
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
