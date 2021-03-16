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
  io.emit('active-users', chatMessages.usersArr)

  // Limpiar cuando alguien se desconecta
  socket.on('disconnect', ()=> {
    chatMessages.disconnectUser(user.id);
    io.emit('active-users', chatMessages.usersArr)
  })

}

module.exports = {
  socketController,
};
