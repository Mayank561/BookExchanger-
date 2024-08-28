import { FETCH_FAV } from "../constants/action";

export default (wishList = [], action) => {
  switch (action.type) {
    case FETCH_FAV:
      return action.payload;
    default:
      return wishList;
  }
};
