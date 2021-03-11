// Referencias del HTML
const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const txtMessage = document.getElementById('txtMessage');
const btnSend = document.getElementById('btnSend');

const socketClient = io();

socketClient.on('connect', () => {
  lblOnline.style.display = '';
  lblOffline.style.display = 'none';
});

socketClient.on('disconnect', () => {
  lblOffline.style.display = '';
  lblOnline.style.display = 'none';
});

socketClient.on('send-message', (payload) => {
  console.log(payload);
})

btnSend.addEventListener('click', () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: '123ABC',
    date: new Date().getTime(),
  };

  socketClient.emit('send-message', payload, (ID) => {
    console.log('Desde el server', ID)
  });
});
