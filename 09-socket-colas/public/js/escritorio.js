const lblTituloEscritorio = document.getElementById('lblTituloEscritorio');
const btnAtenderTicket = document.getElementById('btnAtenderTicket');
const lblTicket = document.getElementById('lblTicket');
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.getElementById('lblPendientes');

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

socket.on('tickets-pendientes', (ticketsPendientes)=> {

    if (ticketsPendientes === 0) {
        lblPendientes.style.display = 'none'
    } else {
        lblPendientes.style.display = '';
        lblPendientes.textContent = ticketsPendientes;
    }

})

btnAtenderTicket.addEventListener('click', ()=> {
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.textContent = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTicket.textContent = `Ticket ${ticket.numero}`
    })
})
