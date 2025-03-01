document.addEventListener('turbo:load', function() {
  // Delegação de eventos para elementos adicionados dinamicamente
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('select-movie') ||
        event.target.closest('.select-movie')) {

      const button = event.target.classList.contains('select-movie') ?
                     event.target :
                     event.target.closest('.select-movie');

      const movieId = button.dataset.movieId;

      // Define o valor do campo oculto
      document.getElementById('bookmark_movie_id').value = movieId;

      // Feedback visual para destacar o filme selecionado
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('border-primary');
      });
      button.closest('.card').classList.add('border-primary');

      // Opcional: rolar até o formulário de comentário
      document.querySelector('label[for="bookmark_comment"]').scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
