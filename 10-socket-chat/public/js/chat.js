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

  socket.on('receive-messages', showMessages);

  socket.on('active-users', showActiveUsers);

  socket.on('private-message', () => {
    //TODO:
  });

}

const showActiveUsers = (users = []) => {
  let usersHtml = '';
  users.forEach( ({name, uid}) => {
    usersHtml += `
      <li>
        <p>
            <h5 class="text-success">${name}</h5>
            <span class="fs-6 text-muted">${uid}</span>
        </p>
      </li>
    `
  });
  ulUsers.innerHTML = usersHtml;
}

const showMessages = (messages = []) => {
  let messagesHtml = '';
  messages.forEach(({name, message}) => {
    messagesHtml += `
      <li>
        <p>
            <span class="text-primary">${name}</span>
            <span>${message}</span>
        </p>  
     </li>
    `;
  });

  ulMessages.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', ({keyCode}) => {
  const message = txtMessage.value;
  const uid = txtUid.value;

  if (keyCode !== 13){ return; }
  if (message.trim().length === 0) { return; }

  socket.emit('send-message', { message, uid });
  txtMessage.value = '';

})

const main = async () => {
  // Validar JWT
  await validateJWT();
};

main();
