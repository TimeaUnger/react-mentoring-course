import React, { useState, useEffect } from "react";
import GenreSelect from "../GenreSelect/GenreSelect";
import SortControl from "../SortControl/SortControl";
import MovieTiles from "../MovieTiles/MovieTiles";
import { useSearchParams, Outlet } from "react-router-dom";

const MovieListPage = (props) => {

  const { genres, sortSelected } = props;
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [sortOption, setSortOption] = useState("release_date");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
    searchBy: "title",
    sortBy: "release_date",
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

  const handleGenreSelect = (selectedGenre) => {
    setSearchQuery(selectedGenre);

    if (selectedGenre === "All") {
      setActiveGenre("All");
      setSearchParams({
        search: "",
        searchBy: "title",
        sortBy: "release_date",
      });
    } else {
      setActiveGenre(selectedGenre);
      setSearchParams({
        search: selectedGenre,
        searchBy: "genres",
        sortBy: "release_date",
      });
    }

    setSortOption("release_date");
  };

  const handleSortSelection = (sortBy, selectedGenre) => {
    if (selectedGenre === "All") {
      setSearchParams({
        search: searchQuery,
        searchBy: "title",
        sortBy: sortBy,
      });
    } else {
      setSearchParams({
        search: searchQuery,
        searchBy: "genres",
        sortBy: sortBy,
      });
    }

    setSortOption(sortBy);
  };

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
          <GenreSelect
            onGenreSelect={handleGenreSelect}
            genres={genres}
            activeGenre={activeGenre}
            searchQuery={activeGenre}
          />
          <SortControl
            handleSortSelection={handleSortSelection}
            searchQuery={searchQuery}
            activeGenre={activeGenre}
            selectedSortOption={sortOption}
          />
        </div>
        {movies && (
          <MovieTiles
            movies={movies}
            sortSelected={sortSelected}
            showDialogMovieForm={showDialogMovieForm}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  );
};

export default MovieListPage;