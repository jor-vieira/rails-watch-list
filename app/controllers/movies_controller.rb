class MoviesController < ApplicationController
  def search
    if params[:query].present?
      # Supondo que você tenha um serviço para buscar filmes do TMDB
      @movies = FetchMoviesService.call(params[:query])
      # Ou uma versão mais simples diretamente usando a API do TMDB
      require 'open-uri'
      require 'json'

      url = "https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=#{URI.encode_www_form_component(params[:query])}"
      response = URI.open(url).read
      results = JSON.parse(response)['results']
      @movies = results.map do |movie|
        OpenStruct.new(id: movie['id'], title: movie['title'], poster_path: movie['poster_path'],
                       overview: movie['overview'])
      end
    else
      @movies = []
    end

    respond_to do |format|
      format.js # Isso vai renderizar search.js.erb
    end
  end
end
