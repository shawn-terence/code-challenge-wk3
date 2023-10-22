const dataLink = `http://localhost:3000/films`;//gave the json server a variable name
// put the code in an event listener to prevent errors
document.addEventListener('DOMContentLoaded', () => {
    movieFetch();

    function movieFetch() {
        fetch(dataLink)
            .then(res => res.json())
            .then(data => {
                ticketCalculator(data);
                movielist(data);
                // Instroduced function delegation 
                const listItems = document.querySelectorAll('.list-item');
                listItems.forEach(listItem => {
                    listItem.addEventListener('click', () => {
                        const selectedMovie = data.find(movie => movie.title === listItem.textContent);
                        poster(selectedMovie);
                        console.log('Clicked on: ', listItem.textContent);
                    });
                });
            });
    }

    let availableTickets, capacity, soldTickets;

    function movielist(data) {
        const movienamecontainer = document.querySelector('.movienamecontainer');
        data.forEach(item => {
            movienamecontainer.innerHTML += `<li class="list-item">${item.title}</li>`;
        });
    }

    function ticketCalculator(data) {
        data.forEach(item => {
            capacity = item.capacity;
            soldTickets = item.tickets_sold;
            availableTickets = parseInt(capacity - soldTickets);
            item.availableTickets = availableTickets;
        });
    }

    function poster(movie) {
        const posterdiv = document.createElement('div');
        posterdiv.innerHTML = `
        <div class ="card"
            <div class="card2" style="width: 18rem; ">
                <img src="${movie.poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.description}</p>
                    <p class = "available"> Tickets available: ${movie.availableTickets}</p>
                    <p class = "unavailable"> </p>
                    <button class="ticketBuy">Buy Ticket</button>
                </div>
            </div>;
        </div>`    
        const columndiv = document.querySelector('#columndiv');
        columndiv.innerHTML = ''; // Clear previous content
        columndiv.appendChild(posterdiv);

        const buyButton = posterdiv.querySelector('.ticketBuy');
        buyButton.addEventListener('click', () => {
            buyTicket(movie);
        });
    }

    function buyTicket(ClickedMovie) {
        if (ClickedMovie.availableTickets > 0) {
            ClickedMovie.soldTickets++;
            ClickedMovie.availableTickets--;
            updateTicketInfo(ClickedMovie);
        } else if(ClickedMovie.availableTickets<1){
            emptyTicket(ClickedMovie)
            console.log('Sorry, all tickets for this movie have been sold out!');
        }
    }
    function emptyTicket(ClickedMovie){
        const unavailableTickets=document.querySelector(`.unavailable`)
        unavailableTickets.textContent=`Sorry, all tickets for this movie have been sold out`
    }

    function updateTicketInfo(ClickedMovie) {
        const availableTicketsElement = document.querySelector('.available');
        availableTicketsElement.textContent = `Tickets available: ${ClickedMovie.availableTickets}`;
    }
});

