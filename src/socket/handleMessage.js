function handleMessage(socket, data) {
  socket.emit("message", data);
}

export default handleMessage;
