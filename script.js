const apiKey = '4896736f';
let watchlist = [];

document.getElementById('search-button').addEventListener('click', searchMovies);
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

function searchMovies() {
    const query = document.getElementById('search-input').value;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
    document.getElementById('movie-results').innerHTML = 'Searching...';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                document.getElementById('movie-results').innerHTML = 'No movies found.';
            }
        })
        .catch(error => {
            document.getElementById('movie-results').innerHTML = 'Error fetching data.';
        });
}

function displayMovies(movies) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        const posterImg = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150?text=No+Image';
        card.innerHTML = `<img src="${posterImg}" alt="${movie.Title}"><h3>${movie.Title}</h3><p>${movie.Year}</p><button onclick="addToWatchlist('${movie.Title}')">Add to Watchlist</button>`;
        resultsContainer.appendChild(card);
    });
}

function addToWatchlist(movieTitle) {
    watchlist.push(movieTitle);
    renderWatchlist();
}

function renderWatchlist() {
    const watchlistContainer = document.getElementById('watchlist-items');
    watchlistContainer.innerHTML = '';
    watchlist.forEach(movie => {
        const item = document.createElement('div');
        item.innerHTML = `<span>${movie}</span><button onclick="removeFromWatchlist('${movie}')">Remove</button>`;
        watchlistContainer.appendChild(item);
    });
}


function removeFromWatchlist(movieTitle) {
    watchlist = watchlist.filter(movie => movie !== movieTitle);
    renderWatchlist();
}









