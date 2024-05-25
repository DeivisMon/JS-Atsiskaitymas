import { loadData, saveData } from './storage.js';
import { initAdminPanel } from './admin.js';
import { initUserPanel} from './user.js';

const moviesKey = 'movies';

export function initReservationPanel(movieIndex, isAdmin) {
    const content = isAdmin ? document.getElementById('adminContent') : document.getElementById('userContent');
    const movies = loadData(moviesKey);
    const movie = movies[movieIndex];

    content.innerHTML = `
        <h2>${isAdmin ? 'Manage Reservations for' : 'Reserve Seats for'} ${movie.title}</h2>
        <h5 id="goBack" onclick="goBack(${isAdmin})">${isAdmin ? '<<< Back To Admin Panel >>>' : '<<< Back To User Zone >>>'}</h5>
        <div class="reserveSeats">
            <div class="reserveSeatsBorder"><img src="${movie.image}" alt="${movie.title}"></div>
            <div>
                <div id="seatsContainer" class="seats-container"></div>
                ${isAdmin ? '<button id="cancelSeatsBtn">Cancel Reservations</button>' : '<button id="reserveSeatsBtn">Reserve Seats</button>'}
            </div>  
        </div>
    `;
    renderSeats(movie, movieIndex, isAdmin);
    if (!isAdmin) {
        document.getElementById('reserveSeatsBtn').addEventListener('click', () => reserveSeats(movieIndex));
    } else {
        document.getElementById('cancelSeatsBtn').addEventListener('click', () => cancelSelectedSeats(movieIndex));
    }
}

function renderSeats(movie, movieIndex, isAdmin) {
    const seatsContainer = document.getElementById('seatsContainer');
    seatsContainer.innerHTML = '';

    for (let i = 1; i <= movie.seats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.innerText = i;

        if (movie.reservations.includes(i)) {
            seat.classList.add('reserved');
            if (isAdmin) {
                seat.classList.add('admin-reserved');
                seat.addEventListener('click', () => selectSeat(seat));
            }
        } else {
            if (!isAdmin) {
                seat.addEventListener('click', () => selectSeat(seat));
            }
        }
        seatsContainer.appendChild(seat);
    }
}

function selectSeat(seat) {
    seat.classList.toggle('selected');
}

function reserveSeats(movieIndex) {
    const movies = loadData(moviesKey);
    const movie = movies[movieIndex];
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected'))
        .map(seat => parseInt(seat.innerText));
    movie.reservations.push(...selectedSeats);
    movie.reservations = [...new Set(movie.reservations)];
    saveData(moviesKey, movies);
    initReservationPanel(movieIndex, false);
}

function cancelSelectedSeats(movieIndex) {
    const movies = loadData(moviesKey);
    const movie = movies[movieIndex];
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected'))
        .map(seat => parseInt(seat.innerText));
    movie.reservations = movie.reservations.filter(seat => !selectedSeats.includes(seat));
    saveData(moviesKey, movies);
    initReservationPanel(movieIndex, true);
}


function goBack(isAdmin) {
    if (isAdmin) {
        initAdminPanel();
    } else {
        initUserPanel();
    }
}

window.goBack = goBack;

