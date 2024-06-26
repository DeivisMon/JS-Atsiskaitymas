import { initReservationPanel } from './reservation.js';
import { loadData } from './storage.js';

//localStorage key movies\\
const moviesKey = 'movies';

// User screen\\
export function initUserPanel() {
    const userContent = document.getElementById('userContent');
    userContent.classList.add('hidden');
    setTimeout(() => {
    userContent.innerHTML = `
        <h2>User Zone</h2>
        <div id="userControls">
            <button id="showMovieListBtn">Choose Movies</button>
            <button id="showReservationsListBtn">Your Reservations</button>
        </div>
        <div id="userInnerContent"></div>
    `;

    document.getElementById('showMovieListBtn').addEventListener('click', showMovieList);
    document.getElementById('showReservationsListBtn').addEventListener('click', showReservationsList);
        userContent.classList.remove('hidden');
    }, 300);
}

// Pries ikeliant user movie list\\
function showMovieList() {
    hideUserControls()
    const userInnerContent = document.getElementById('userInnerContent');
    userInnerContent.classList.add('hidden');
    setTimeout(() => {
        userInnerContent.innerHTML = `
            <h4>Choose Movie</h4>
            <h5 id="backToUserBtn"><<< Back to User Zone >>></h5>
            <div id="moviesList"></div>
        `;
    document.getElementById('backToUserBtn').addEventListener('click', initUserPanel);
    renderMoviesList();
        userInnerContent.classList.remove('hidden');
    }, 300);
}

// Sukuria user movie list\\
function renderMoviesList() {
    const movies = loadData(moviesKey) || [];
    const limitedMovies = movies.slice(0, 10);
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = limitedMovies.map((movie, index) => {
        const seatsAvailable = movie.seats - movie.reservations.length;
        const buttonSold = seatsAvailable > 0 ?
            `<button onclick="openUserReservationPanel(${index})">Reserve Seats</button>` :
            `<button class="soldOutBtn">Sold Out</button>`;
        return `
            <div class="movie">
                <h3>${movie.title}</h3>
                <img src="${movie.image}" alt="${movie.title}">
                <p>Seats available: ${seatsAvailable} / ${movie.seats}</p>
                ${buttonSold}
            </div>
        `;
    }).join('');
}

// Pries ikleiant reserved seats list\\
function showReservationsList() {
    hideUserControls()
    const userInnerContent = document.getElementById('userInnerContent');
    userInnerContent.classList.add('hidden');
    setTimeout(() => {
        userInnerContent.innerHTML = `
            <h4>Your Reservations</h4>
            <h5 id="backToUserBtn"><<< Back to User Zone >>></h5>
            <div id="reservationsList"></div>
        `;
        document.getElementById('backToUserBtn').addEventListener('click', initUserPanel);
        renderReservationsList();
        userInnerContent.classList.remove('hidden');
    }, 300);
}

// User reserved seats list\\
function renderReservationsList() {
    const movies = loadData(moviesKey) || [];
    const reservationsList = document.getElementById('reservationsList');
    const userReservations = movies.filter(movie => movie.reservations.length > 0).map(movie => {
        const reservedSeats = movie.reservations.length;
        return `
            <div class="yourReservations">
                <h3>${movie.title}</h3>
                <p>You Reserved ${reservedSeats} Seats</p>
            </div>
        `;
    }).join('');
    reservationsList.innerHTML = userReservations || '<div style="color: white; font-size: 30px; text-align: center">You have no reservations.</div>';
}

//Nurodo kas atidaro reservation panel\\
function openUserReservationPanel(movieIndex) {
    initReservationPanel(movieIndex, false);
}

// Slepti user controls, kai ju nereikia\\
function hideUserControls() {
    const userControls = document.getElementById('userControls');
    if (userControls) {
        userControls.style.display = 'none';
    }
}


window.openUserReservationPanel = openUserReservationPanel;
