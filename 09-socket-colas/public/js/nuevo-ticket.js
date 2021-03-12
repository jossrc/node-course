const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnNuevoTicket = document.getElementById('btnNuevoTicket');

const socket = io();

socket.on('connect', () => {
   btnNuevoTicket.disabled = false;
});

socket.on('disconnect', () => {
   btnNuevoTicket.disabled = true;
});

socket.on('ultimo-ticket', (ultimoTicket)=> {
  lblNuevoTicket.textContent = ultimoTicket;
})

btnNuevoTicket.addEventListener('click', ()=> {
    socket.emit('siguiente-ticket', null, (ticket) => {
        console.log('Desde el server', ticket)
        lblNuevoTicket.textContent = ticket;
    })
})

