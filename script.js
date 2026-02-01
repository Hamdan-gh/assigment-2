// declaration of variable with api key and a watchlist array
const apiKey = '4896736f';  
let watchlist = [];   // array to store movies


//event listener when click runs searMovies()
document.getElementById('search-button').addEventListener('click', searchMovies);

//event listener when click switch light/dark mode
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

// function created  for search movies to run
function searchMovies() {
    const query = document.getElementById('search-input').value;   // get what user type in search box
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;  // combines  api key and search text
    document.getElementById('movie-results').innerHTML = 'Searching...';   // tells the user something is happpening


    // send request to OMDb
    fetch(url)
        .then(response => response.json())  //convert raw data into javascript object

        //movies existed, show them, else no movies found
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                document.getElementById('movie-results').innerHTML = 'No movies found.';
            }
        })

        //throw error if something wrong
        .catch(error => {
            document.getElementById('movie-results').innerHTML = 'Error fetching data.';
            console.error(error);
        });
}

// function to show movies on the page
function displayMovies(movies) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = ''; // clear previous results from mixing new ones
    
    //go through each movie one by one as for loop
    movies.forEach(movie => {
        //create div  and assign to a variable card and given a class of movie-card
        const card = document.createElement('div');
        card.className = 'movie-card';

        //handling missing poster images, if exist use it, else use placeholder image
        const posterImg = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150?text=No+Image';

        //adding movie content image, title, year and button to add to watchlist
        card.innerHTML = `<img src="${posterImg}" alt="${movie.Title}"><h3>${movie.Title}</h3><p>${movie.Year}</p><button onclick="addToWatchlist('${movie.Title}')">Add to Watchlist</button>`;
        resultsContainer.appendChild(card);
    });
}

//function to save movie to watchlist button is clicked
function addToWatchlist(movieTitle) {
    watchlist.push(movieTitle);
    renderWatchlist();  // update the watchlist display
}

function renderWatchlist() {
    const watchlistContainer = document.getElementById('watchlist-items');
    watchlistContainer.innerHTML = '';
    watchlist.forEach(movie => {            //loop through to save movie
        const item = document.createElement('div');

        //show movie title and remove button
        item.innerHTML = `<span>${movie}</span><button onclick="removeFromWatchlist('${movie}')">Remove</button>`;
        watchlistContainer.appendChild(item);
    });
}


function removeFromWatchlist(movieTitle) {
const index = watchlist.find(movie => movie === movieTitle);   //remove the selected movies from the array
watchlist.splice(index,1);
    renderWatchlist(); // refresh the display
}
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}









