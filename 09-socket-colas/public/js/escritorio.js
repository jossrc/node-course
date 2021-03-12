const lblTituloEscritorio = document.getElementById('lblTituloEscritorio');
const btnAtenderTicket = document.getElementById('btnAtenderTicket');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblTituloEscritorio.textContent = escritorio;

const socket = io();

socket.on('connect', () => {
    btnAtenderTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAtenderTicket.disabled = true;
});

socket.on('ultimo-ticket', (ultimoTicket)=> {
   // lblNuevoTicket.textContent = ultimoTicket;
})

btnAtenderTicket.addEventListener('click', ()=> {
    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     console.log('Desde el server', ticket)
    //     lblNuevoTicket.textContent = ticket;
    // })
})
