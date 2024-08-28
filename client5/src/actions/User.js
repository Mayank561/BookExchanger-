import {
  FETCH_FAV,
  GET_PROFILE,
  EDIT_PROFILE,
  ERROR,
  CHANGE_PASSWORD,
  FEEDBACK,
  VALID,
  GET_RECENTS,
} from "../constants/action";
import { API } from "../api/index";

export const getProfile = (id) => async (dispatch) => {
  try {
    const { data } = await API.getProfile(id);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getRecentUsers = () => async (dispatch) => {
  try {
    const { data } = await API.getRecentUsers();
    dispatch({ type: GET_RECENTS, payload: data });
  } catch (error) {
    console.log(error); 
  }
};

export const editProfile = (userProfile) => async (dispatch) => {
  try {
    const { data } = await API.editProfile(userProfile); 
    dispatch({ type: EDIT_PROFILE, payload: data });
    dispatch({ type: VALID, payload: { msg: "Profile updated successfully" } });
  } catch (error) {
    const data = error.response.data;
    dispatch({ type: ERROR, payload: data });
    dispatch({ type: VALID, payload: data });
  }
};

export const changePassword = (passData) => async (dispatch) => {
  try {
    console.log("IN action", passData);
    const { data } = await API.changePassword(passData);
    console.log(data, "after actions");
    dispatch({ type: CHANGE_PASSWORD, payload: data });
    dispatch({
      type: VALID,
      payload: { msg: "Password Updated successfully" },
    });
  } catch (error) {
    console.log(error);
    const data = error.response.data;
    dispatch({ type: ERROR, payload: data });
    dispatch({ type: VALID, payload: data });
  }
};

export const getWishList = (id) => async (dispatch) => { 
  try {
    const { data } = await API.getWishList(id);
    console.log(data);
    dispatch({ type: FETCH_FAV, payload: data }); 
  } catch (error) { 
    console.log(error);
  }
};

export const postFeedBackForm = (feedData) => async (dispatch) => {
  try {
    console.log(feedData);
    const { data } = await API.sendMail(feedData);
    dispatch({ type: FEEDBACK, payload: data });
  } catch (error) {
    const data = error.response.data; 
    console.log(data);
    dispatch({ type: FEEDBACK, payload: data });
  }
};
