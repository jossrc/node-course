const { checkJWT } = require("../helpers");
const { Socket } = require('socket.io');

const socketController = async (socket = new Socket()) => {
  console.log('Socket Controller ', socket.handshake.headers['x-token'])
  const token = socket.handshake.headers['x-token'];
  const user = await checkJWT(token)

  if (!user) {
    return socket.disconnect();
  }

  console.log('Se conectó ', user.name)

}

module.exports = {
  socketController,
};
