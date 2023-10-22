const dataLink = `http://localhost:3000/films`; // URL for the JSON server

document.addEventListener('DOMContentLoaded', () => {
    movieFetch();

    // Function to fetch movie data from the server
    function movieFetch() {
        fetch(dataLink)
            .then(res => res.json())
            .then(data => {
                // Calculate available tickets and populate movie list
                ticketCalculator(data);
                movielist(data);

                // Add click event to movie list items
                const listItems = document.querySelectorAll('.list-item');
                listItems.forEach(listItem => {
                    listItem.addEventListener('click', () => {
                        // Find selected movie and display its details
                        const selectedMovie = data.find(movie => movie.title === listItem.textContent);
                        poster(selectedMovie);
                        console.log('Clicked on: ', listItem.textContent);
                    });
                });
            });
    }

    let availableTickets, capacity, soldTickets;

    // Function to populate the movie list in the sidebar
    function movielist(data) {
        const movienamecontainer = document.querySelector('.movienamecontainer');
        data.forEach(item => {
            movienamecontainer.innerHTML += `<li class="list-item">${item.title}</li>`;
        });
    }

    // Function to calculate ticket availability for each movie
    function ticketCalculator(data) {
        data.forEach(item => {
            capacity = item.capacity;
            soldTickets = item.tickets_sold;
            availableTickets = parseInt(capacity - soldTickets);
            item.availableTickets = availableTickets;
        });
    }

    // Function to display movie details in the main content area
    function poster(movie) {
        // Create and populate movie card
        const posterdiv = document.createElement('div');
        posterdiv.innerHTML = `
        <div class="card">
            <div class="card2" style="width: 18rem;">
                <img src="${movie.poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.description}</p>
                    <p class="available">Tickets available: ${movie.availableTickets}</p>
                    <p class="unavailable"></p>
                    <button class="ticketBuy">Buy Ticket</button>
                </div>
            </div>
        </div>`    ;

        // Append movie card to the main content area
        const columndiv = document.querySelector('#columndiv');
        columndiv.innerHTML = ''; // Clear previous content
        columndiv.appendChild(posterdiv);

        // Add click event to Buy Ticket button
        const buyButton = posterdiv.querySelector('.ticketBuy');
        buyButton.addEventListener('click', () => {
            buyTicket(movie);
        });
    }

    // Function to handle ticket purchase logic
    function buyTicket(ClickedMovie) {
        if (ClickedMovie.availableTickets > 0) {
            ClickedMovie.soldTickets++;
            ClickedMovie.availableTickets--;
            updateTicketInfo(ClickedMovie);
        } else if (ClickedMovie.availableTickets < 1) {
            emptyTicket(ClickedMovie);
            console.log('Sorry, all tickets for this movie have been sold out!');
        }
    }

    // Function to display message when tickets are sold out
    function emptyTicket(ClickedMovie) {
        const unavailableTickets = document.querySelector('.unavailable');
        unavailableTickets.textContent = `Sorry, all tickets for this movie have been sold out`;
    }

    // Function to update available ticket information in the card
    function updateTicketInfo(ClickedMovie) {
        const availableTicketsElement = document.querySelector('.available');
        availableTicketsElement.textContent = `Tickets available: ${ClickedMovie.availableTickets}`;
    }
});



