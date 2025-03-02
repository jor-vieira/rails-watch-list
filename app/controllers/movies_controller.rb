class MoviesController < ApplicationController
  require 'net/http'
  
  def search
    require 'open-uri'
    require 'json'

    api_key = ENV['TMDB_API_KEY']
    query = params[:query]

    if query.present?
      url = "https://api.themoviedb.org/3/search/movie?api_key=#{api_key}&query=#{URI.encode_www_form_component(query)}"
      response = URI.open(url).read
      data = JSON.parse(response)

      @movies = data["results"].first(5).map do |movie_data|
        {
          id: movie_data["id"],
          title: movie_data["title"],
          poster_path: movie_data["poster_path"],
          release_date: movie_data["release_date"],
          overview: movie_data["overview"]
        }
      end
    else
      @movies = []
    end

    respond_to do |format|
      format.js # This will render search.js.erb
    end
  end
end
