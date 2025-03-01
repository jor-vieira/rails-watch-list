import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["results", "movieId", "movieTitle"]

  connect() {
    console.log("Movie selection controller connected")
  }

  select(event) {
    const button = event.currentTarget
    const movieId = button.dataset.movieId
    const movieTitle = button.dataset.movieTitle

    // Definir o ID do filme no campo oculto
    document.getElementById('bookmark_movie_id').value = movieId

    // Adicionar feedback visual
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => card.classList.remove('border-primary'))
    button.closest('.card').classList.add('border-primary')

    console.log(`Selected movie: ${movieTitle} (ID: ${movieId})`)
  }
}
