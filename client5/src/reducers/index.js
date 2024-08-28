import { combineReducers } from "redux";

import books from "./books";
import book from "./book";
import authData from "./auth";
import user from "./user";
import filterData from "./filter";
import wishList from "./WishList";
import chats from "./chats";
// import notification from "./notification";
import notification from "./notifiaction";
import recents from "./recents";

export default combineReducers({
  books,
  authData,
  filterData,
  wishList,
  user,
  book,
  chats,
  notification,
  recents,
});
