document.addEventListener('turbo:load', function() {

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('select-movie') ||
        event.target.closest('.select-movie')) {

      const button = event.target.classList.contains('select-movie') ?
                     event.target :
                     event.target.closest('.select-movie');

      const movieId = button.dataset.movieId;


      document.getElementById('bookmark_movie_id').value = movieId;

      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('border-primary');
      });
      button.closest('.card').classList.add('border-primary');


      document.querySelector('label[for="bookmark_comment"]').scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
