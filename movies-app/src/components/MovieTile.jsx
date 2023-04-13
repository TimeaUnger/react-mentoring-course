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
import defaultImage from '../assets/image-placeholder.jpg';
import { useState } from 'react';
import './MenuHamburger.css';

const MovieTile = (props) => {

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState('');

  const showDetails = (movieDetails) => {
      props.handleMovieClick(movieDetails)
  }

  const handleAction = (action) => {
    props.handleMovieAction(action, props.movieDetails);
  }

  const handleMenuButton = () => {

    if(!isVisible){
      setIsVisible(true)
      setIsOpen('open')
    }
    else{
      setIsVisible(false)
      setIsOpen('')
    }

  }

  const {title, release_date, genres, poster_path } = props.movieDetails;
 
  return (

    <div className="movieTileWrapper">
      <div className="editDeleteBlock">
      {isVisible &&
        <div className="editDeleteRowsWrapper">
          <div className="editMovieRow" id="editMovie" onClick={()=> handleAction('edit')}>Edit</div>
          <div className="deleteMovieRow" id="deleteMovie" onClick={()=> handleAction('delete')}>Delete</div>
        </div>
       }
       <div className="editDeleteMenuWrapper">
          <div className="top-nav" id="navButton" onClick={handleMenuButton}>
            <div className={`menu-toggle ${isOpen}`} id="menu-toggle"></div>
            <div className='menu-button-container' >
              <div className='menu-button'></div>
            </div>
          </div>
        </div>
      </div> 
      <div className="movieTile">
        <div 
          className="movieImage" 
          onClick={()=> showDetails(props.movieDetails)}
        >
          <img src={poster_path} alt={title} 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=`${defaultImage}`;
            }}
            
          />
        </div>
        <div className="movieTileDetails">
          <div className="movieTitleWrapper">
            <div className="movieTitle">{title}</div>
            <div className="releaseDate">{release_date.substr(0, 4)}</div>
          </div>
        </div>
          <div className="movieGenre">{genres.join(", ")}</div>
      </div>
    </div>
  );
}

export default MovieTile;