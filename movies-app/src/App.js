import React, { useState, useEffect } from "react";
import './App.css';
import Dialog from './components/Dialog/Dialog';
import MovieForm from './components/MovieForm/MovieForm';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Routes, Route, useSearchParams } from 'react-router-dom';

function App() {

  const [movies, setMovies] = useState([]);
  const [movieDetailsOnSubimt, setMovieDetailsOnSubmit] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [modalOpen, setModalVisibility] = useState(false);
  const [formAction, setFormAction] = useState(false);
  const [formData, setFormData] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams(
    {
      search: '', 
      searchBy: 'title', 
      sortBy: 'release_date'
    });

  const moviesUrl = `http://localhost:4000/movies?${searchParams}&sortOrder=asc&limit=20`;

  const genresAll = [
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

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setSelectedGenre('All');
    setSearchParams({search: searchQuery, searchBy: 'title', sortBy: 'release_date'})
  }

  const handleSortSelection = (sortBy) => {

    if(selectedGenre === 'All'){
      setSearchParams({search: searchQuery, searchBy: 'title', sortBy: sortBy})
    }
    else{
      setSearchParams({search: searchQuery, searchBy: 'genres', sortBy: sortBy})
    }
  }

  const handleGenreSelection = (selectedGenre) => {

    setSearchQuery(selectedGenre);

    if(selectedGenre === "All"){
      setSelectedGenre('All');
      setSearchParams({search: '', searchBy: 'title', sortBy: 'release_date'})
    }
    else{
      setSelectedGenre(selectedGenre);
      setSearchParams({search: selectedGenre, searchBy: 'genres', sortBy: 'release_date'})
    }
  }

  const handleCloseModal = () => {
    setModalVisibility(false);
    setFormAction(false);
  }
  
  const handleSubmit = (formData, action) => {
    // console.log(formData)
    setMovieDetailsOnSubmit(formData);
  }

  const showDialogMovieForm  = (action, movie) => {
    setModalVisibility(true);
    setFormAction(action);
    setFormData(movie);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          
          <MovieListPage 
            showDialogMovieForm={showDialogMovieForm}
            genresUnique={genresAll}
            handleSortSelect={handleSortSelection}
            movies={movies}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            handleGenreSelection={handleGenreSelection}
          />
          } 
        />
      </Routes>
      <Dialog handleCloseModal={handleCloseModal} modalOpen={modalOpen} >
        {formAction &&
          <MovieForm 
            genres={genresAll} 
            handleSubmit={handleSubmit} 
            formData={formData} 
            handleCloseModal={handleCloseModal}
            formAction={formAction}
          />
        }
      </Dialog>
    </div>
  );
}

export default App;
