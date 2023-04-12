// import joinRoom from "./joinRoom";
// import handleMessage from "./handleMessage";
// import io from "socket.io-client";

// const newSocket = io("http://localhost:3001", {
//   auth: {
//     token: localStorage.getItem("token"),
//   },
// });

// export default newSocket;

// function initSocket(newSocket) {

//   newSocket.on("connect", () => {
//     console.log("Connected to server");
//   });

//   newSocket.on("join", (roomId) => {
//     joinRoom(newSocket, roomId);
//   });

//   newSocket.on("message", (data) => {
//     handleMessage(newSocket, data);
//   });

//   newSocket.on("disconnect", () => {
//     console.log("Disconnected from server");
//   });

//   newSocket.on("newNotification", (notification) => {
//     console.log("Received new notification: ", notification);
//   });
// }

// export default initSocket;
