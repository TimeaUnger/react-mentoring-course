import React, { useState } from "react";
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Dialog from './components/Dialog/Dialog';
import MovieForm from './components/MovieForm/MovieForm';
import MovieListPage from './components/MovieListPage/MovieListPage';
import MovieDetails, { getData } from "./components/MovieDetails/MovieDetails";
import SearchForm from "./components/SearchForm/SearchForm";

function App() {

  const [modalOpen, setModalVisibility] = useState(false);
  const [formAction, setFormAction] = useState(false);
  const [formData, setFormData] = useState(false);
  const [movieDetailsOnSubimt, setMovieDetailsOnSubmit] = useState({});

  const genres = [
    "All",
    "Drama",
    "Romance",
    "Animation",
    "Advaneture",
    "Family",
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
  ];

  const handleSearch = (searchQuery) => {
    // const searchUrl = `?search=${searchQuery}&searchBy=title&&sortBy=release_date&sortOrder=asc&limit=20`;
    //window.location.replace(searchUrl);
  }

  const handleCloseModal = () => {
    setModalVisibility(false);
    setFormAction(false);
  }

  const handleSubmit = (formData, action) => {
    // console.log(formData)
    setMovieDetailsOnSubmit(formData);
  }

  const showDialogMovieForm = (action, movie) => {
    setModalVisibility(true);
    setFormAction(action);
    setFormData(movie);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={`/`} element={<MovieListPage genres={genres} />}>
        <Route
          path={`/`}
          element={
            <SearchForm
              showDialogMovieForm={showDialogMovieForm}
              onSearch={handleSearch}
            />
          }
        />
        <Route path="/:id" element={<MovieDetails />} loader={getData} />
      </Route>
    )
  );

  return (
    <div className="App">

      <Dialog handleCloseModal={handleCloseModal} modalOpen={modalOpen} >
        {formAction &&
          <MovieForm
            genres={genres}
            handleSubmit={handleSubmit}
            formData={formData}
            handleCloseModal={handleCloseModal}
            formAction={formAction}
          />
        }
      </Dialog>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
