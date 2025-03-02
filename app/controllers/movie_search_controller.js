<script>
  document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("movie-search-form");
    const resultsContainer = document.getElementById("movie-results");
    const addMovieBtn = document.getElementById("add-movie-btn");
    const movieIdInput = document.querySelector("[name='bookmark[movie_id]']");

    searchForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const query = document.getElementById("query").value;

      fetch(`/movies/search?query=${query}`, { headers: { "Accept": "application/json" } })
        .then(response => response.json())
        .then(data => {
          resultsContainer.innerHTML = "";
          data.movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("card", "m-2");
            movieCard.style.width = "150px";
            movieCard.innerHTML = `
              <img src="${movie.poster_url}" class="card-img-top">
              <div class="card-body">
                <h6>${movie.title}</h6>
                <button class="btn btn-sm btn-success select-movie" data-movie-id="${movie.id}">Select</button>
              </div>
            `;
            resultsContainer.appendChild(movieCard);
          });

          document.querySelectorAll(".select-movie").forEach(button => {
            button.addEventListener("click", function() {
              movieIdInput.value = this.getAttribute("data-movie-id");
              addMovieBtn.disabled = false;
            });
          });
        });
    });
  });
</script>
