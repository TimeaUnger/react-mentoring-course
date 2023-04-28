import React from "react";
import "./MovieTile.css";
import defaultImage from "../../assets/image-placeholder.jpg";
import { useState } from "react";
import "../MenuHamburger/MenuHamburger";
import { Link, useLocation } from "react-router-dom";

const MovieTile = (props) => {
  
  const location = useLocation();
  const PATH = location.search;

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState("");

  const handleAction = (action) => {
    props.showDialogMovieForm(action, props.movieDetails);
  };

  const handleMenuButton = () => {
    if (!isVisible) {
      setIsVisible(true);
      setIsOpen("open");
    } else {
      setIsVisible(false);
      setIsOpen("");
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const { title, release_date, genres, poster_path, id } = props.movieDetails;

  return (
    <Link to={`/${id}${PATH}`}>
      <div className="movieTileWrapper">
        <div className="editDeleteBlock">
          {isVisible && (
            <div className="editDeleteRowsWrapper">
              <div
                className="editMovieRow"
                id="editMovie"
                onClick={() => handleAction("edit")}
              >
                Edit
              </div>
              <div
                className="deleteMovieRow"
                id="deleteMovie"
                onClick={() => handleAction("delete")}
              >
                Delete
              </div>
            </div>
          )}
          <div className="editDeleteMenuWrapper">
            <div className="top-nav" id="navButton" onClick={handleMenuButton}>
              <div className={`menu-toggle ${isOpen}`} id="menu-toggle"></div>
              <div className="menu-button-container">
                <div className="menu-button"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="movieTile">
          <div className="movieImage" onClick={handleClick}>
            <img
              src={poster_path}
              alt={title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${defaultImage}`;
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
    </Link>
  );
};

export default MovieTile;
