const lblTituloEscritorio = document.getElementById('lblTituloEscritorio');
const btnAtenderTicket = document.getElementById('btnAtenderTicket');
const lblTicket = document.getElementById('lblTicket');
const divAlerta = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblTituloEscritorio.textContent = escritorio;
divAlerta.style.display = 'none';

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
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.textContent = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTicket.textContent = `Ticket ${ticket.numero}`
    })
    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     console.log('Desde el server', ticket)
    //     lblNuevoTicket.textContent = ticket;
    // })
})
