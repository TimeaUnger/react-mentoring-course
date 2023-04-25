import React from "react";
import "./GenreSelect.css";
import { useSearchParams } from "react-router-dom";

const GenreSelect = (props) => {

  const [searchParams, setSearchParams] = useSearchParams({});

  const activeGenre = searchParams.get("activeGenre") ? searchParams.get("activeGenre") : "All";
  const sortBy = searchParams.get("sortBy");

  const onSelectHandler = (event) => {

    const selectedGenre = event.target.innerHTML;
    
    if (selectedGenre === "All") {

      setSearchParams({
        search: "",
        searchBy: "title",
        sortBy: sortBy,
        activeGenre: "All"
      });
    } else {

      setSearchParams({
        search: selectedGenre,
        searchBy: "genres",
        sortBy: sortBy,
        activeGenre: selectedGenre
      });
    }
  };

  return (
    <div className="genreSelect">
      <ul data-testid="GenreListItem" aria-label="genresAll">
        {props.genres.map((genre, index) => {
          return (
            <li
              key={index}
              onClick={onSelectHandler}
              className={`genreItem ${activeGenre === genre && "active"}`}
            >
              {genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenreSelect;
