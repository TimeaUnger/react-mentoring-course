import React, { useState, useEffect } from "react";
import './App.css';
import Counter from './components/Counter';
import SearchForm from './components/SearchForm';
import GenreSelect from './components/GenreSelect';
import SortControl from './components/SortControl';
import MovieTiles from './components/MovieTiles';
import MovieDetails from "./components/MovieDetails";
import Dialog from "./components/Dialog";
import MovieForm from "./components/MovieForm";

function App() {

  const initialSearch = "Star Wars";

  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [searchQuery, setSearchTerm] = useState(initialSearch);
  const [genresUnique, setGenresUnique] = useState([]);
  const [active, setActive] = useState(false);
  const [sortSelected, setSortSelected] = useState("release_date");
  const [modalOpen, setModalVisibility] = useState(false);
  const [formAction, setFormAction] = useState(false);
  const [formData, setFormData] = useState(false);
  const moviesUrl = `http://localhost:4000/movies?sortBy=${sortSelected}&sortOrder=asc`;
  
  
  useEffect(() => {
    
    fetch(moviesUrl)
      .then((response) => response.json())
        .then((res) => {
          // set the unique "genres" from the object received
          let genresArr = ["All"];
          res.data.forEach(function (value) {
            genresArr.push(...value.genres)
          });

          let genresUnique = genresArr.filter((value, index, array) => array.indexOf(value) === index);
          setGenresUnique(genresUnique);
          setMovies(res.data);

        })
        .catch((err) => {
          console.log(err.message);
        });
  }, []);
 
  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  }

  const handleGenreSelect = (selectedGenre) => {
    setActive(selectedGenre)
  }

  const handleTileClick = (movieDetails) => {
    setMovieDetails(movieDetails);
    setShowMovieDetails(true);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  const handleSortSelection = (sortBy) => {

    if(sortBy === "title"){

      const sortedList = movies.sort((a, b) =>
      a.title.localeCompare(b.title));
      setMovies(sortedList);
    }
    else{
      const sortedList = movies.sort((a, b) =>
      a.release_date.localeCompare(b.release_date));
      setMovies(sortedList)
    }

    setSortSelected(sortBy);
  }

  const showSearchHeader = () =>{
    setShowMovieDetails(false);
  }

  const handleCloseModal = () => {
    setModalVisibility(false);
    setFormAction(false);
  }
  
  const handleSubmit = (formData, action) => {
    console.log(formData)
    if(action === 'delete') {
      setShowMovieDetails(false);
    }
    else{
      setMovieDetails(formData);
    }
  }

  const handleMovieAction  = (action, movie) => {
    setModalVisibility(true);
    setFormAction(action);
    setFormData(movie);
  }

  return (
    <div className="App">
          {/* <Counter counterNr={0} /> */}
        <div className="pageHeader">
          
        {showMovieDetails
            ? <MovieDetails 
                movie={movieDetails} 
                showSearchHeader={showSearchHeader} 
                handleMovieAction={handleMovieAction}
                setMovieForm={handleMovieAction}
            />
            : <SearchForm 
                onSearch={handleSearch} 
                searchVal={searchQuery} 
                handleMovieAction={handleMovieAction}
                formAction={formAction}
              />
        }

        </div>
        <div className="pageBody">
          <div className="selectSection">
            <GenreSelect onSelect={handleGenreSelect} genres={genresUnique} isActive={active} />
            <SortControl handleSelect={handleSortSelection} />
          </div>
          {movies && <MovieTiles movies={movies} handleMovieClick={handleTileClick} sortSelected={sortSelected} handleMovieAction={handleMovieAction}/>}
          
        </div>

        <Dialog handleCloseModal={handleCloseModal} modalOpen={modalOpen} >
          {formAction &&
            <MovieForm 
              genres={genresUnique} 
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
