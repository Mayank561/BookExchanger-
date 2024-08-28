import axios from "axios";

export const API = axios.create({
  baseURL: "https://bookexchanger.onrender.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const urlBook = "/books";
export const fetchBooks = () => API.get(`${urlBook}/all`);

export const createBookAd = (formData) => API.post(`${urlBook}/add`, formData);

export const addToWishList = (id) => API.patch(`${urlBook}/${id}/addWishList`);

export const showBookInfo = (bookId) => API.get(`${urlBook}/book/${bookId}`);
export const updatedIsSold = (bookId) => API.patch(`${urlBook}/${bookId}`);

export const deleteBook = (bookId) => API.delete(`${urlBook}/${bookId}`);

export const editBook = (id, formData) =>
  API.patch(`${urlBook}/${id}`, formData);

export const urlUsers = "/users";

export const SignUp = (formData) => API.post(`${urlUsers}/signUp`, formData);
export const signIn = (formData) => API.post(`${urlUsers}/signIn`, formData);

export const checkUserValid = (token) =>
  API.post(`${urlUsers}/token-check`, token);
export const sendPasswordMail = (email) =>
  API.post(`${urlUsers}/sendMail`, email);
export const resetPassword = (formData) =>
  API.post(`${urlUsers}/resetPassword`, formData);

export const verifyEmail = (email) =>
  API.post(`${urlUsers}/verify-email`, email);
export const verifiedUser = (token) =>
  API.post(`${urlUsers}/validate-user`, token);

export const googleFacebookSignIn = (formData) =>
  API.post(`${urlUsers}/google-facebook-signIn`, formData);

export const getProfile = (id) => API.get(`${urlUsers}/profile/${id}`);

export const getRecentUsers = () => API.get(`${urlUsers}/profile/message`);
export const editProfile = (id, updatedUser) =>
  API.patch(`${urlUsers}/profile/${id}`, updatedUser);
export const changePassword = (id, updatedPassword) =>
  API.patch(`${urlUsers}/profile/${id}`, updatedPassword);

export const sendMail = (feedData) =>
  API.post(`${urlUsers}/send-email`, feedData);

export const deleteBookFromWish = (book_id) =>
  API.delete(`${urlUsers}/wishlist/${book_id}`);
