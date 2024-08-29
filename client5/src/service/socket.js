import io from "socket.io-client";

const ENDPOINT = "localhost:8000";

export const socket = io(ENDPOINT, { authConnect: true });
