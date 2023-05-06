import React from "react";
import Select from "react-select";
import Button from "../Button/Button";
import "./AddMovieForm.css";
import { useForm, Controller } from "react-hook-form";
import useFetch from "../../customHooks/useFetch";
import {
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const EditMovieForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const PATH = location.search;

  const url = `http://localhost:4000/movies/${id}`;
  const [data] = useFetch(url);

  const urlSearch = location.search;

  const searchStr = urlSearch.substr(1, urlSearch.length).split("&");
  const objSearchParams = {};

  if (searchStr[0].length > 0) {
    searchStr?.forEach((param, index) => {
      const paramVal = param.split("=");
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }

  const {
    title,
    release_date,
    poster_path,
    vote_average,
    overview,
    runtime,
    genres,
  } = data || {};

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/${id}${PATH}`;
    navigate(path);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    data.id = Number(id);
    data.vote_average = Number(data.vote_average);
    data.runtime = Number(data.runtime);

    const arrGenres = [];
    // convert received object to array
    data.genres.forEach((genre) => { 
      arrGenres.push(genre.label)
    })
    data.genres = arrGenres;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:4000/movies", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const path = `/${data.id}${PATH}`;

        navigate(path, {
          state: { shouldUpdate: true },
        });
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch(function (err) {
        console.info(err);
      });
  };
  const objGenresDefault = [];
  // set existing genres if any into correct object format for multi-select options
  genres?.forEach((genre) => {
    objGenresDefault.push({ value: `${genre}`, label: `${genre}` });
  });

  const genresAll = [
    "Drama",
    "Romance",
    "Animation",
    "Adventure",
    "Family",
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action",
  ];

  var restGenres = genres
    ? genresAll.filter((item) => !genres.includes(item))
    : genresAll;

  const objGenresAll = [];
  // set genres options into correct object format for multi-select options
  restGenres?.forEach((genre) => {
    objGenresAll.push({ value: `${genre}`, label: `${genre}` });
  });

  const resetForm = () => {};

  return (
    <div className="dialog-container" id="dialogContainer">
      <div className="closeButton" onClick={routeChange}>
        X
      </div>

      <div className="movieFormWrapper">
        <div className="movieFormBoxTitle">Edit movie</div>
        <div className="movieForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="movieFormContent">
              <div className="inputRow">
                <div className="movieTitle">
                  <label htmlFor="movieTitle" className="movieFormLabel">
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={title}
                    className="movieTitleInput"
                    id="movieTitle"
                    {...register("title", {
                      required: "This field is required.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <span className="formValidationError">*{message}</span>
                    )}
                  />
                </div>
                <div className="movieReleaseDate">
                  <label htmlFor="movieReleaseDate" className="movieFormLabel">
                    Release date
                  </label>
                  <input
                    type="date"
                    defaultValue={release_date}
                    className="movieTitleInput"
                    id="movieReleaseDate"
                    {...register("release_date", {
                      required: "This field is required.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="release_date"
                    render={({ message }) => (
                      <span className="formValidationError">*{message}</span>
                    )}
                  />
                </div>
              </div>
              <div className="inputRow">
                <div className="movieUrl">
                  <label htmlFor="movieUrl" className="movieFormLabel">
                    Movie url
                  </label>
                  <input
                    type="text"
                    id="movieUrl"
                    defaultValue={poster_path}
                    {...register("poster_path", {
                      required: "This field is required.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="poster_path"
                    render={({ message }) => (
                      <span className="formValidationError">*{message}</span>
                    )}
                  />
                </div>
                <div className="movieRating">
                  <label htmlFor="movieRating" className="movieFormLabel">
                    Rating
                  </label>
                  <input
                    type="text"
                    name="vote_average"
                    id="movieRating"
                    defaultValue={vote_average}
                    {...register("vote_average", {
                      required: "This field is required.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="vote_average"
                    render={({ message }) => (
                      <span className="formValidationError">*{message}</span>
                    )}
                  />
                </div>
              </div>
              <div className="inputRow">
                <div className="movieGenreSelect">
                  <label htmlFor="movieGenre" className="movieFormLabel">
                    Genre
                  </label>
                  <Controller
                    control={control}
                    name="genres"
                    render={({
                      field: { onChange, onBlur, objGenresDefault, name, ref },
                    }) => (
                      <Select
                        defaultValue={objGenresDefault}
                        options={objGenresAll}
                        onBlur={onBlur} // notify when input is touched
                        onChange={onChange} // send value to hook form
                        isMulti={true}
                        name={name}
                        ref={ref}
                      />
                    )}
                  />
                </div>
                <div className="movieRuntime">
                  <label htmlFor="movieRuntime" className="movieFormLabel">
                    Runtime
                  </label>
                  <input
                    type="text"
                    id="movieRuntime"
                    defaultValue={runtime}
                    {...register("runtime", {
                      required: "This field is required.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="runtime"
                    render={({ message }) => (
                      <span className="formValidationError">*{message}</span>
                    )}
                  />
                </div>
              </div>
              <div className="inputRow textarea">
                <label htmlFor="movieOverview" className="movieFormLabel">
                  Overview
                </label>
                <textarea
                  id="movieOverview"
                  defaultValue={overview}
                  {...register("overview", {
                    required: "This field is required.",
                  })}
                ></textarea>
                <ErrorMessage
                  errors={errors}
                  name="overview"
                  render={({ message }) => (
                    <span className="formValidationError">*{message}</span>
                  )}
                />
              </div>
              <div className="formButtonsWrapper">
                <Button
                  type="button"
                  className="movieFormResetBtn"
                  onClick={resetForm}
                >
                  Reset
                </Button>
                <Button type="submit" className="movieFormSubmitBtn">
                  Submit
                </Button>
              </div>
            </div>

            {errors.exampleRequired && <span>This field is required</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovieForm;
