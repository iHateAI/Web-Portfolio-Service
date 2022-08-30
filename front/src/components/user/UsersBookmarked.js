import React, { useEffect, useState } from "react";

import * as Api from "../../api";
import UserCard2 from "./UserCard2";

function UsersBookmarked() {
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [ioTarget, setIoTarget] = useState(null);

  useEffect(() => {
    Api.get("api/userlist", "?bookmark=true").then((res) => {
      const data = res.data.data;
      setUsers(data);
      if (data.length < 3) setPagedUsers(data.slice(0, data.length));
      else setPagedUsers(data.slice(0, 3));
    });
  }, []);

  useEffect(() => {
    let io;
    let page = 3;
    if (ioTarget) {
      const pageControll = (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (page * 3 >= users.length) {
              setPagedUsers([...users]);
            } else {
              setPagedUsers([...users.slice(0, page * 3)]);
              page++;
            }
            observer.observe(entry.target);
          }
        });
      };
      io = new IntersectionObserver(pageControll, {
        threshold: 1,
      });
      io.observe(ioTarget);
    }
    return () => io && io.disconnect();
  }, [ioTarget, users]);

  return (
    <div className="usercard-container">
      <div className="usercard">
        {pagedUsers.map((user) => (
          <UserCard2 key={user.id} user={user} isNetwork />
        ))}
      </div>
      <div ref={setIoTarget} style={targetStyle} />
    </div>
  );
}

export default UsersBookmarked;

const targetStyle = {
  width: "1px",
  height: "1px",
};
