import { AUTH, VALID } from "../constants/action";
import { API } from "../api/index";

// Sign up action
export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch({ type: AUTH, payload: data });
    dispatch({
      type: VALID,
      payload: { msg: "Check your email to verify and login", type: "info" },
    });
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg || "An error occurred during sign-up.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
  }
};

// Sign in action
export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { email, password } = formData;
    const { data } = await API.signIn({ email, password });
    dispatch({ type: AUTH, payload: data });
    dispatch({
      type: VALID,
      payload: { msg: "Logged in successfully", type: "success" },
    });
    history.push("/");
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg || "An error occurred during sign-in.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
  }
};

// Google/Facebook sign-in action
export const googleFacebookSignIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.googleFacebookSignIn(formData);
    dispatch({ type: AUTH, payload: data });
    dispatch({
      type: VALID,
      payload: { msg: "Logged in successfully", type: "success" },
    });
    history.push("/");
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg ||
      "An error occurred during Google/Facebook sign-in.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
  }
};

// Send password reset mail action
export const sendPasswordMail = (resetEmail) => async (dispatch) => {
  try {
    const { data } = await API.sendPasswordMail({ email: resetEmail });
    dispatch({ type: VALID, payload: { msg: data.msg, type: "success" } });
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg ||
      "An error occurred while sending the password reset mail.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
  }
};

// Check user validity action
export const checkUserValid = (token, history) => async (dispatch) => {
  try {
    const { data } = await API.checkUserValid({ token });
    dispatch({ type: VALID, payload: { msg: data.msg, type: "success" } });
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg ||
      "An error occurred while checking user validity.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
    history.push("/auth");
  }
};

// Reset password action
export const resetPassword =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      const { data } = await API.resetPassword({
        password,
        confirmPassword,
        token,
      });
      dispatch({ type: VALID, payload: { msg: data.msg, type: "success" } });
    } catch (err) {
      const errorMsg =
        err?.response?.data?.msg ||
        "An error occurred while resetting the password.";
      dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
    }
  };

// Send email verification action
export const sendVerifyMail = (verifyEmail) => async (dispatch) => {
  try {
    const { data } = await API.verifyEmail({ email: verifyEmail });
    dispatch({ type: VALID, payload: { msg: data.msg, type: "success" } });
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg ||
      "An error occurred while sending the verification mail.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
  }
};

// Verify user action
export const verifiedUser = (token, history) => async (dispatch) => {
  try {
    const { data } = await API.verifiedUser({ token });
    dispatch({ type: AUTH, payload: data });
    dispatch({ type: VALID, payload: { msg: data.msg, type: "success" } });
    history.push("/");
  } catch (err) {
    const errorMsg =
      err?.response?.data?.msg || "An error occurred while verifying the user.";
    dispatch({ type: VALID, payload: { msg: errorMsg, type: "error" } });
  }
};
