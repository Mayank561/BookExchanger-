import { ADDFILTER } from "../constants/action";
const filterR = (filterData = [], action) => {
  switch (action.type) {
    case ADDFILTER:
      return action.payload;
    default:
      return [];
  }
};
export default filterR;
