import { GET_RECENTS } from "../constants/action.js";

export default (recents = {}, action) => {
  switch (action.type) {
    case GET_RECENTS:
      return action.payload;
    default:
      return recents;
  }
};
