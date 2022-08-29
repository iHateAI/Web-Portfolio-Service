const bookmarks = {
  "6030d1ce-c06b-4b7b-9702-5377fc047f35": [
    "35b6956e-1c74-4535-a7c2-952e4ee4f5c7",
  ],
};

const get = (userId) => {
  if (!bookmarks[userId]) {
    bookmarks[userId] = [];
    return false;
  }

  return bookmarks[userId];
};

const push = (userId, bookmarkId) => {
  bookmarks[userId].push(bookmarkId);
  console.log("push: ", bookmarks[userId]);
  return;
};

const remove = (userId, bookmarkId) => {
  bookmarks[userId] = bookmarks[userId].filter((id) => id !== bookmarkId);
  console.log("remove: ", bookmarks[userId]);
  return;
};

export { get, push, remove };
