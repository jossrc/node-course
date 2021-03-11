// Referencias del HTML
const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');

const socketClient = io();

socketClient.on('connect', () => {
   lblOnline.style.display = '';
   lblOffline.style.display = 'none';
});

socketClient.on('disconnect', () => {
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

