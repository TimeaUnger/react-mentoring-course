import React from "react";
import Button from "../Button/Button";
import "./DeleteMovieForm.css";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom";

const DeleteMovieForm = () => {

  const [searchParams, setSearchParams] = useSearchParams({});

  const location = useLocation();
  const urlSearch = location.search;

  const searchStr = urlSearch.substr(1, urlSearch.length).split("&");
  const objSearchParams = {};

  if (searchStr[0].length > 0) {
    searchStr?.map((param, index) => {
      const paramVal = param.split("=");
      objSearchParams[paramVal[0]] = paramVal[1];
    });
  }

  let navigate = useNavigate();
  const PATH = location.search;
  const routeChange = () => { 
    const path = `/${id}${PATH}`; 
    navigate(path);
  }

  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {

    console.log(id)
    const movieID = Number(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id}),
    };

    fetch(`http://localhost:4000/movies/${movieID}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

        const path = `/${PATH}`;
        const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=10`;

        fetch(moviesUrl)
          .then((response) => response.json())
          .then((movies) => {
            navigate(path, {
              state: [{ movieData: data }, { moviesList: movies }],
            });
          })
          .catch(function (err) {
            console.info(err);
          });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dialog-container" id="dialogContainer">
        <div className="closeButton" onClick={routeChange}>
          X
        </div>
        <div className="movieFormWrapper">
          <div className="movieFormBoxTitle">Delete movie</div>
          <div className="deleteMovieContent">
            <div className="deleteMovieBody">
              Are you sure you want to delete this movie?
            </div>
            <div className="deleteMovieFooter">
              <Button type="submit" className="movieFormSubmitBtn">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeleteMovieForm;
