/*
    This component will render movie details when a movie is selected from the list (clicked). 
    The details include movie poster image on the left and the rest of info on the right.

    The component should take properties to receive image url, movie name, release year, rating, 
    duration and a description. Alternatively, you can specify a single property that accepts an object with all movie info.
*/

import React from "react";
import './MovieDetails.css';

const MovieDetails = (props) => {
    
    const toHoursAndMinutes = (totalMinutes) => {

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
    
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    }

    const showSearchHeader = () => {
      props.showSearchHeader();
    }
    const {title, poster_path, vote_average, genres, release_date, runtime, overview} = props.movie

    return (
      <div className="movieDetailsContainer">
        <div className="movieDetailTopHeader">
          <div className="movieService">netflixroulette</div>
          <div className="movieSearch" onClick={showSearchHeader}></div>
        </div>
        <div className="moviesDetails">
          <div className="movieDetailsInner">
            <div className="movieImage">
                <img src={poster_path} alt={title} />
            </div>
            <div className="movieSummary">
              <div className="movieDetailsHeader">
                  <div className="movieDetailsTitle">{title}</div>
                  <div className="movieDetailsRatingCircle">
                      <span className="movieDetailsRating">{vote_average}</span>
                  </div>
              </div>
              <div className="movieDetailsGenre">{genres.join(", ")}</div>
              <div className="movieDateRuntimeWrapper">
                  <div className="movieDetailsReleaseDate">{release_date.substr(0, 4)}</div>
                  <div className="movieDetailsRunTime">{toHoursAndMinutes(runtime)}</div>
              </div>
              <div className="movieDetailsOverview">{overview}</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MovieDetails;