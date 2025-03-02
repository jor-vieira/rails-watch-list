document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('movie-search-form');
  const resultsContainer = document.getElementById('movie-results');
  const movieIdInput = document.querySelector('input[name="bookmark[movie_id]"]');
  const addMovieBtn = document.getElementById('add-movie-btn');

  // API configuration
  const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
  const baseUrl = 'https://api.themoviedb.org/3';
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';

  searchForm.addEventListener('input', function(e) {
    const query = e.target.value.trim();

    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    // Search for movies using the TMDB API
    fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          displayMovieResults(data.results.slice(0, 5)); // Display top 5 results
        } else {
          resultsContainer.innerHTML = '<p>No movies found.</p>';
        }
      })
      .catch(error => {
        console.error('Error searching for movies:', error);
        resultsContainer.innerHTML = '<p>Error searching for movies. Please try again.</p>';
      });
  });

  function displayMovieResults(movies) {
    resultsContainer.innerHTML = '';

    const movieList = document.createElement('div');
    movieList.className = 'list-group';

    movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.className = 'list-group-item movie-result d-flex align-items-center';
      movieItem.dataset.id = movie.id;

      const posterUrl = movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Poster';

      const releaseYear = movie.release_date ? `(${movie.release_date.slice(0, 4)})` : '';

      movieItem.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}" class="mr-3" style="width: 50px;">
        <div class="ml-3">
          <h5 class="mb-1">${movie.title} ${releaseYear}</h5>
          <p class="mb-1 text-muted">${movie.overview ? movie.overview.slice(0, 100) + '...' : 'No overview available'}</p>
        </div>
      `;

      movieItem.addEventListener('click', function() {
        // Highlight the selected movie
        document.querySelectorAll('.movie-result').forEach(item => {
          item.classList.remove('active');
        });
        this.classList.add('active');

        // Set the movie ID in the hidden field
        movieIdInput.value = this.dataset.id;

        // Enable the submit button
        addMovieBtn.disabled = false;
      });

      movieList.appendChild(movieItem);
    });

    resultsContainer.appendChild(movieList);
  }
});
