import { io } from "socket.io-client";
import BASE_URL from "./url";
export const socket = io(BASE_URL,{
    withCredentials: true});

socket.on("connect", () => {
    console.log(socket.connected , "Socket connected"); // true
  });
  
socket.on("disconnect", () => {
    console.log(socket.connected); // false
});