const socketController = (socket) => {
  console.log('Cliente conectado ', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });

  socket.on('send-message', (payload, callback) => {
    const ID = 123456;
    callback(ID);
    //socket.emit('send-message', payload);
    socket.broadcast.emit('send-message', payload);
  });
};

module.exports = {
  socketController,
};
