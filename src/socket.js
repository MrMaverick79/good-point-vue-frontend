import { io } from "socket.io-client";

export const socket = io("http://localhost:3000",{
    withCredentials: true});

socket.on("connect", () => {
    console.log(socket.connected , "Socket connected"); // true
  });
  
socket.on("disconnect", () => {
    console.log(socket.connected); // false
});