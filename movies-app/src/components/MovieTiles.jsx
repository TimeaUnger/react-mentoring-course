import React from "react";
import './MovieTiles.css';
import MovieTile from './MovieTile';

const MovieTiles = (props) => {

  const showMovieDetails = (movie) => {
      props.handleMovieClick(movie)
  }

  return (
    <div className="moviesBody">
      <div className="moviesBodyInner">
        <div className="foundMovies">
          <span className="foundMoviesNr">{props.movies?.length}</span>
          <span className="foundMoviesTitle">movies found</span>
        </div>
        <div className="moviesWrapper">
          {
            props.movies?.map((movie) => {
              return (
                <MovieTile movieDetails={movie} handleMovieClick={showMovieDetails} key={movie.id}/>
              )
            })}
        </div>
      </div>
    </div>

  );
}

export default MovieTiles;