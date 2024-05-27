import { saveData, loadData } from './storage.js';
import { initReservationPanel } from './reservation.js';

//localStorage key movies\\
const moviesKey = 'movies';

//Admin screen\\
export function initAdminPanel() {
    const adminContent = document.getElementById('adminContent');
    adminContent.classList.add('hidden')
    setTimeout(() => {
    adminContent.innerHTML = `
        <h2>Admin Panel</h2>
        <div id="adminControls">
            <button id="addMovieFormBtn">Add Movies</button>
            <button id="showMoviesListBtn">Manage</button>
        </div>
        <div id="adminInnerContent"></div>ZZ
    `;

    document.getElementById('addMovieFormBtn').addEventListener('click', addMovieForm);
    document.getElementById('showMoviesListBtn').addEventListener('click', createMoviesList);
        adminContent.classList.remove('hidden');
    }, 300);
}

// Filmu idejimo forma\\
function addMovieForm() {
    const movies = loadData(moviesKey) || [];
    if (movies.length >= 10) {
        alert('10 movies is enough! Lets not get crazzzy! ヽ(•‿•)ノ');
        return;
    }
    hideAdminControls();
    const adminInnerContent = document.getElementById('adminInnerContent');
    adminInnerContent.classList.add('hidden');
    setTimeout(() => {
        adminInnerContent.innerHTML = `
            <h4>Add New Movie</h4>
            <h5 id="backToAdminBtn"><<< Back to Admin Panel >>></h5>
            <div id="movieForm">
                <form>
                    <input type="text" id="title" placeholder="Movie Title" required>
                    <input type="text" id="image" placeholder="Image URL" required>
                    <input type="number" id="seats" min="0" max="30" placeholder="Number of Seats" required>
                    <button id="submitBtn" type="submit">Add Movie</button>
                </form>
            </div>
        `;
        document.getElementById('movieForm').addEventListener('submit', addMovie);
        document.getElementById('backToAdminBtn').addEventListener('click', initAdminPanel);
        adminInnerContent.classList.remove('hidden')
    }, 300);
}

// Admin movie list to edit\\
function createMoviesList() {
    hideAdminControls();
    const adminInnerContent = document.getElementById('adminInnerContent');
    const movies = loadData(moviesKey) || [];
    adminInnerContent.classList.add('hidden');
    setTimeout(()=> {
    adminInnerContent.innerHTML = `
        <h4>Added Movies</h4>
        <h5 id="backToAdminBtn"><<< Back to Admin Panel >>></h5>
        <div id="moviesList"></div>
    `;
    document.getElementById('backToAdminBtn').addEventListener('click', initAdminPanel);

    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = movies.map((movie, index) => `
        <div class="movieAdmin">
            <h3>${movie.title}</h3>
            <img src="${movie.image}" alt="${movie.title}">
            <p>Seats available: ${movie.seats - movie.reservations.length} / ${movie.seats}</p>
            <button id="deleteBtn" onclick="deleteMovie(${index})">Delete Movie</button>
            <button id="cancelBtn" onclick="openAdminReservationPanel(${index})">View Reservations</button>
        </div>
    `).join('');
        adminInnerContent.classList.remove('hidden')
    }, 300);
}

// Prideti filma\\
function addMovie(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const seats = parseInt(document.getElementById('seats').value);

    const movies = loadData(moviesKey) || [];
    movies.push({ title, image, seats, reservations: [] });
    saveData(moviesKey, movies);
    createMoviesList();
}

// Istrinti filma\\
function deleteMovie(movieIndex) {
    const movies = loadData(moviesKey);
    movies.splice(movieIndex, 1);
    saveData(moviesKey, movies);
    createMoviesList();
}

//Nurodo kas atidaro reservation panel\\
function openAdminReservationPanel(movieIndex) {
    initReservationPanel(movieIndex, true);
}

// Slepti admin controls, kai ju nereikia\\
function hideAdminControls() {
    const adminControls = document.getElementById('adminControls');
    if (adminControls) {
        adminControls.style.display = 'none';
    }
}

window.deleteMovie = deleteMovie;
window.openAdminReservationPanel = openAdminReservationPanel;
