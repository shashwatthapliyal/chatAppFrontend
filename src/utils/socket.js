import { BASE_URL } from "./constants";
import { io } from "socket.io-client";


const socket = location.hostname === "localhost"
    ? io(BASE_URL)
    : io("/", { path: "/api/socket.io" });

export default socket;