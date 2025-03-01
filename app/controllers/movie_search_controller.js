document.addEventListener("turbo:load", function () {
  const searchForm = document.getElementById("movie-search-form");
  const resultsContainer = document.getElementById("movie-results");
  const movieIdField = document.querySelector("input[name='bookmark[movie_id]']");
  const addButton = document.getElementById("add-movie-btn");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(searchForm);
      const query = formData.get("query");

      fetch(`/movies/search?query=${encodeURIComponent(query)}`, { headers: { "Accept": "text/html" } })
        .then(response => response.text())
        .then(html => {
          resultsContainer.innerHTML = html;
        });
    });
  }

  resultsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("select-movie")) {
      const movieId = event.target.getAttribute("data-id");
      const movieTitle = event.target.getAttribute("data-title");

      movieIdField.value = movieId;
      addButton.disabled = false;
    }
  });
});
