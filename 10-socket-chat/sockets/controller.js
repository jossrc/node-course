const { checkJWT } = require("../helpers");
const { Socket } = require('socket.io');
const { ChatMessages } = require('../models');

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  // Se obtiene los headers que se envían por socket
  const token = socket.handshake.headers['x-token'];
  const user = await checkJWT(token)

  if (!user) {
    return socket.disconnect();
  }
  // Agregar el usuario conectado
  chatMessages.connectUser(user);
  io.emit('active-users', chatMessages.usersArr);
  socket.emit('receive-messages', chatMessages.lastTen);

  // Conectarlo a una sala especial
  socket.join(user.id) // global, socket.id, user.id

  // Limpiar cuando alguien se desconecta
  socket.on('disconnect', ()=> {
    chatMessages.disconnectUser(user.id);
    io.emit('active-users', chatMessages.usersArr)
  });

  socket.on('send-message', ({ uid, message }) => {

    if (uid) {
      // Mensaje privado
      socket.to(uid).emit('private-message' ,{ from: user.name, message})
    } else {
      chatMessages.sendMessage(user.id, user.name, message);
      io.emit('receive-messages', chatMessages.lastTen);
    }
  });

}

module.exports = {
  socketController,
};
