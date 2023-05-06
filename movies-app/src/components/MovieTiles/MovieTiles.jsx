import React from "react";
import "./MovieTiles.css";
import MovieTile from "../MovieTile/MovieTile";
import { useSearchParams, useLocation } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import { useIsMount } from '../../customHooks/useIsMount';

const MovieTiles = () => {

  const location = useLocation();
  const isMount = useIsMount();
  const urlSearch = location.search;
  const searchStr = urlSearch.substr(1, urlSearch.length).split("&");

  const objSearchParams = {};

  // existing search params
  if (searchStr[0].length > 0) {
    searchStr?.map((param, index) => {
      const paramVal = param.split("=");
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }
  // inital load /
  else{
    objSearchParams.sortBy = 'release_date';
  }

  const [searchParams] = useSearchParams(objSearchParams);

  const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=10`;
  const [data] = useFetch(moviesUrl);

  const movieData = !location.state ? data?.data : location.state[1].moviesList.data;

  return (
    !isMount && 
    <>
      <div className="foundMoviesWrapper">
        <div className="foundMovies">
          <span className="foundMoviesNr">{data.totalAmount}</span>
          <span className="foundMoviesTitle">movies found</span>
        </div>
      </div>
      <div className="movieListContentWrapper">
        <div className="movieTilesWrapper">
          {movieData.map((movie) => {
            return (
              <MovieTile
                movieDetails={movie}
                key={movie.id}
              />
            );
          })}
        </div>
      </div>
    </>
  )
};

export default MovieTiles;
