function joinRoom(socket, roomId) {
  socket.emit("join", roomId);
}

export default joinRoom;
