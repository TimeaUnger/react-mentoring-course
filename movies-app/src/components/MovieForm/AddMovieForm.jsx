import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../Button/Button";
import "./AddMovieForm.css";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const AddMovieForm = () => {

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const PATH = location.search;
  
  const navigate = useNavigate();
  const urlSearch = location.search;

  const searchStr = urlSearch.substr(1, urlSearch.length).split("&");
  const objSearchParams = {};

  if (searchStr[0].length > 0) {
    searchStr?.map((param, index) => {
      const paramVal = param.split("=");
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }

  const genresAll = [
    "Drama",
    "Romance",
    "Animation",
    "Adventure",
    "Family",
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
  ];

  const objGenresAll = [];
  // set existing genres if any into correct object format for multi-select options
  genresAll?.map((genre) => {
    objGenresAll.push({ value: `${genre}`, label: `${genre}` });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const routeChange = () => {
    const path = `/${PATH}`;
    navigate(path);
  };

  const onSubmit = (data) => {

    data.vote_average = Number(data.vote_average);
    data.runtime = Number(data.runtime);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:4000/movies", requestOptions)
      .then((response) => response.json())
      .then((data) => {

        const path = `/${data.id}${PATH}`;
        const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=10`;
        fetch(moviesUrl)
          .then((response) => response.json())
          .then((movies) => {
            navigate(path, {
              state: [{ movieData: data }, { moviesList: movies }],
            });
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          })
          .catch(function (err) {
            console.info(err);
          });
      });
  };

  const resetForm = () => {};

  return (
    <div className="dialog-container" id="dialogContainer">
      <div className="closeButton" onClick={routeChange}>X</div>
      <div className="movieFormWrapper">
        <div className="movieFormBoxTitle">Add movie</div>
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
                    defaultValue=""
                    className="movieTitleInput"
                    id="movieTitle"
                    {...register("title", {
                      required: "This field is required.",
                    })}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) =>  <span className="formValidationError">*{message}</span>}
                  />
                </div>
                <div className="movieReleaseDate">
                  <label htmlFor="movieReleaseDate" className="movieFormLabel">
                    Release date
                  </label>
                  <input
                    type="date"
                    defaultValue=""
                    className="movieTitleInput"
                    id="movieReleaseDate"
                    {...register("release_date", {
                      required: "This field is required.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="release_date"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
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
                    defaultValue=""
                    {...register("poster_path", {
                      required: "This field is required.",
                    })}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="poster_path"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
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
                    defaultValue=""
                    {...register("vote_average", {
                      required: "This field is required.",
                    })}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="vote_average"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
              </div>
              <div className="inputRow">
                <div className="movieGenreSelect">
                  <label htmlFor="movieGenre" className="movieFormLabel">
                    Genre
                  </label>
                  <div className="multiSelectDropDown">
                    <span
                      className="d-inline-block"
                      data-toggle="popover"
                      data-trigger="focus"
                      data-content=""
                    >
                      <Select
                        defaultValue=""
                        options={objGenresAll}
                        isMulti
                        name="genres"
                      />
                    </span>
                  </div>
                </div>
                <div className="movieRuntime">
                  <label htmlFor="movieRuntime" className="movieFormLabel">
                    Runtime
                  </label>
                  <input
                    type="text"
                    id="movieRuntime"
                    defaultValue=""
                    {...register("runtime", {
                      required: "This field is required.",
                    })}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="runtime"
                    render={({ message }) => <span className="formValidationError">*{message}</span>}
                  />
                </div>
              </div>
              <div className="inputRow textarea">
                <label htmlFor="movieOverview" className="movieFormLabel">
                  Overview
                </label>
                <textarea
                  id="movieOverview"
                  defaultValue=""
                  {...register("overview", {
                    required: "This field is required.",
                  })}
                ></textarea>
                <ErrorMessage
                  errors={errors}
                  name="overview"
                  render={({ message }) => <span className="formValidationError">*{message}</span>}
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

export default AddMovieForm;
