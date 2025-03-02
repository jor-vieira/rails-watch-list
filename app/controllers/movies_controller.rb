class MoviesController < ApplicationController
  def search
    query = params[:query]
    if query.present?
      @movies = Movie.where("title ILIKE ?", "%#{query}%")
    else
      @movies = Movie.none
    end

    respond_to do |format|
      format.json { render json: { movies: @movies } }
      format.html # Caso queira renderizar uma view normal
    end
  end
end
