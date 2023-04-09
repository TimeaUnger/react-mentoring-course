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

  const showDetails = (movieDetails) => {
      props.handleMovieClick(movieDetails)
  }
  
  const {title, release_date, genres, poster_path } = props.movieDetails;
  
  return (
    <div className="movieTile">
      <div className="movieImage" onClick={()=> showDetails(props.movieDetails)}>
        <img src={poster_path} alt={title} />
      </div>
      <div className="movieTileDetails">
        <div className="movieTitleWrapper">
          <div className="movieTitle">{title}</div>
          <div className="releaseDate">{release_date.substr(0, 4)}</div>
        </div>
      </div>
        <div className="movieGenre">{genres.join(", ")}</div>
    </div>
  );
}

export default MovieTile;