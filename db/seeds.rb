require 'json'
require 'open-uri'

puts "Limpando o banco de dados..."
Movie.destroy_all

puts "Buscando filmes do TMDB..."
url = "https://tmdb.lewagon.com/movie/top_rated"
movies_serialized = URI.open(url).read
movies = JSON.parse(movies_serialized)['results']

movies.first(1000).each do |movie|
  Movie.create!(
    title: movie['title'],
    overview: movie['overview'],
    poster_url: "https://image.tmdb.org/t/p/w200#{movie['poster_path']}",
    rating: movie['vote_average']
  )
end

puts "Filmes reais adicionados!"
