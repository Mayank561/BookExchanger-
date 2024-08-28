import { AUTH, LOGOUT } from "../constants/action";
import { socket } from "../service/socket";

const authR = (authData = {}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      var id = JSON.parse(localStorage.getItem("profile")).profile.id;
      socket.connect();
      socket.emit("login", { id: id });
      return action.payload;
    case LOGOUT:
      id = JSON.parse(localStorage.getItem("profile")).profile?.id;
      socket.emit("logout", { id: id });
      localStorage.clear();
      socket.close();
      return null;

    default:
      return authData;
  }
};

export default authR;
