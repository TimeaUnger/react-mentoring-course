/*
    This component should render a movie tile from the list of movies.
    It should take properties to receive image url, movie name, release year, and a list of relevant genres.
    Alternatively, you can define one component property to take an object with all movie info. Additionally,
    the component should receive a callback property to capture click event.

    Optionally, you can implement a context menu popup that opens when a user clicks on three dots button
    and contains "Edit" and "Delete" menu items.

*/

import React from "react";
import './MovieTile.css';

const MovieTile = (props) => {

  const showDetails = (movie) => {

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
            props.movies?.map((movie, index) => {
              return (
                <div className="movieTile" onClick={()=> showDetails(movie)} key={movie.id}>
                  <div className="movieImage">
                    <img src={movie.poster_path} alt={movie.title} />
                  </div>
                  <div className="movieTileDetails">
                    <div className="movieTitleWrapper">
                      <div className="movieTitle">{movie.title}</div>
                      <div className="releaseDate">{movie.release_date.substr(0, 4)}</div>
                    </div>
                  </div>
                    <div className="movieGenre">{movie.genres.join(", ")}</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>

  );
}

export default MovieTile;