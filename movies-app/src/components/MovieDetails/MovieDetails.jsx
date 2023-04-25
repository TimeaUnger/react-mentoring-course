import React from "react";
import "./MovieDetails.css";
import defaultImage from "../../assets/image-placeholder.jpg";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useCurrentPath } from "../../Helpers/urlHepler";

const MovieDetails = (props) => {

  const PATH = useCurrentPath();

  useParams();
  const movieData = useLoaderData();

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const {
    title,
    poster_path,
    vote_average,
    genres,
    release_date,
    runtime,
    overview,
  } = movieData;

  return (
    <div className="movieDetailsContainer">
      <div className="movieDetailTopHeader">
        <div className="movieService">netflixroulette</div>
        <Link to={`/${PATH}`}>
          <div className="movieSearch"></div>
        </Link>
      </div>
      <div className="moviesDetails">
        <div className="movieDetailsInner">
          <div className="movieImage">
            <img
              src={poster_path}
              alt={title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${defaultImage}`;
              }}
            />
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
              <div className="movieDetailsReleaseDate">
                {release_date.substr(0, 4)}
              </div>
              <div className="movieDetailsRunTime">
                {toHoursAndMinutes(runtime)}
              </div>
            </div>
            <div className="movieDetailsOverview">{overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;

export const getData = async (data) => {
  const res = await fetch(`http://localhost:4000/movies/${data.params.id}`);
  const list = await res.json();
  return list;
};
