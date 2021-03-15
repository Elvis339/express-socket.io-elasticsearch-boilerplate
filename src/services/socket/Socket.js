exports.emitToSocketId = (eventName, data) => {
  console.log(`Emit ${eventName}`, data);
  global.io.emit(eventName, data);
};

exports.emitOverChannel = (eventName, data) => {
  console.log(`Emit over channel ${eventName}`, data);
  global.io.emit(eventName, data);
};

exports.init = async () => {
  global.io.on("connection", async (socket) => {
    global.io.to(socket.id).emit("notification", false);
    global.io.sockets.sockets[socket.id].disconnect();
  });
};
