const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/api/auth/'
  : 'https://restserver-node-joss.herokuapp.com/api/auth/';

let user = null;
let socket = null;

// Referencias HTML
txtUid = document.getElementById('txtUid');
txtMessage = document.getElementById('txtMessage');
ulUsers = document.getElementById('ulUsers');
ulMessages = document.getElementById('ulMessages');
btnLogout = document.getElementById('btnLogout');

// Validar el token del localstorage
const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';
  console.log('Chat Token UserID ',token);
  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('No hay token en el servidor');
  }

  const resp = await fetch(url, {
    headers: { 'x-token': token },
  });

  const { user: userDB, token: tokenDB } = await resp.json();
  console.log({userDB, tokenDB})
  localStorage.setItem('token', tokenDB);
  user = userDB;
  document.title = user.name;

  await connectSocket();
};

const connectSocket = async () => {
  socket = io({
      'extraHeaders': {
        'x-token': localStorage.getItem('token')
      }
  });

  socket.on('connect', () => {
    console.log('Sockets online')
  });

  socket.on('disconnect', () => {
    console.log('Sockets offline')
  });

  socket.on('receive-messages', () => {
    //TODO:
  });

  socket.on('active-users', (payload) => {
    console.log(payload)
  });

  socket.on('private-message', () => {
    //TODO:
  });

}


const main = async () => {
  // Validar JWT
  await validateJWT();
};

main();
