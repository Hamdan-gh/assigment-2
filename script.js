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

