const apiKey = 'c67a1c902cbb64ac0880009aaaac121d'; // Replace with your TMDB API key
const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieDetails = document.getElementById('movieDetails');
const movieTitle = document.getElementById('movieTitle');
const movieReleaseDate = document.getElementById('movieReleaseDate');
const movieRuntime = document.getElementById('movieRuntime');
const movieOverview = document.getElementById('movieOverview');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

// Function to fetch and display top 10 movies
async function fetchTopMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + apiKey);
        const data = await response.json();
        const topMovies = data.results.slice(0, 10);
        movieGrid.innerHTML = '';

        topMovies.forEach((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
            `;
            movieCard.addEventListener('click', () => showMovieDetails(movie.id));
            movieGrid.appendChild(movieCard);
        });
    } catch (error) {
        showError("Failed to fetch top movies");
    }
}

// Function to search for movies by title
async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
        const data = await response.json();
        const searchResults = data.results;
        movieGrid.innerHTML = '';

        searchResults.forEach((movie) => {
            // Create and display search results
            // Similar to displaying top movies
        });
    } catch (error) {
        showError("Failed to search for movies");
    }
}

// Function to show movie details by ID
async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = await response.json();

        movieTitle.textContent = movie.title;
        movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieOverview.textContent = movie.overview;
        movieDetails.style.display = 'block';
    } catch (error) {
        showError("Failed to fetch movie details");
    }
}

// Function to show loading indicator
function showLoading() {
    loadingIndicator.style.display = 'block';
}

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        showLoading();
        searchMovies(query);
    }
});

// Initialize the application
fetchTopMovies();
