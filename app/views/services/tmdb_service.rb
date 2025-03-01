require 'httparty'

class TmdbService
  include HTTParty
  base_uri 'https://api.themoviedb.org/3'

  API_KEY = ENV['85971737fd38998138c60559979dcc7d']

  def self.search_movies(query)
    response = get("/search/movie", query: { query: query, api_key: API_KEY, language: 'en-US' })
    response.parsed_response['results'] || []
  end
end
