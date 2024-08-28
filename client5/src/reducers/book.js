import { GET_BOOK, VALID, DEL_BOOK_WISH } from "../constants/action";

export default (book = {}, action) => {
  switch (action.tyoe) {
    case GET_BOOK:
      return action.payload;
    case VALID:
      return action.payload;
    case DEL_BOOK_WISH:
      return action.payload;
    default:
      return book;
  }
};
