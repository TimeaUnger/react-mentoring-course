import React, { useState, useEffect } from "react";
import GenreSelect from "../GenreSelect/GenreSelect";
import SortControl from "../SortControl/SortControl";
import MovieTiles from "../MovieTiles/MovieTiles";
import { useSearchParams, Outlet } from "react-router-dom";

const MovieListPage = (props) => {

  const { genres, sortSelected } = props;
  const [movies, setMovies] = useState([]);

  const [searchParams] = useSearchParams({
    search: "",
    searchBy: "title",
    sortBy: "release_date",
    activeGenre: "All",
  });

  const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=20`;

  useEffect(() => {
    fetch(moviesUrl)
      .then((response) => response.json())
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [searchParams]);

  const showDialogMovieForm = (action, movie) => {
    props.showDialogMovieForm(action, movie);
  };

  return (
    <div className="MovieListPage">
      <div className="pageHeader">
        <Outlet />
      </div>

      <div className="pageBody">
        <div className="selectSection">
          <GenreSelect genres={genres} />
          <SortControl />
        </div>
        {movies && (
          <MovieTiles
            movies={movies}
            sortSelected={sortSelected}
            showDialogMovieForm={showDialogMovieForm}
          />
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
