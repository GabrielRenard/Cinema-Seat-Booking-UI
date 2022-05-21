const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');



let ticketPrice = parseInt(movieSelect.value);

populateUI();

// Functions
// 0. save selected move and price for local storage
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

// 1. Update selected seat count and total price
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    // Save selected seats to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    console.log(seatsIndex);

    const numSeats = selectedSeats.length;
    count.innerText = numSeats;
    total.innerText = numSeats * ticketPrice;
}

// Event Listeners

// Get data from storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// 1. Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = parseInt(movieSelect.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// 2. Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();

