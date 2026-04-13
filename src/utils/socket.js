import { BASE_URL } from "./constants";
import { io } from "socket.io-client";


// Add auth in the message

// function getCookie(name) {
//     return document.cookie
//         .split("; ")
//         .find((row) => row.startsWith(name + "="))
//         ?.split("=")[1];

// }

// const token = getCookie("token");

// console.log(token)

const socket = io(BASE_URL//, {
//     token,
//  }

);
export default socket;

