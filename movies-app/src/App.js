import React, { useState, useEffect } from "react";
import './App.css';
import Counter from './components/Counter';
import SearchForm from './components/SearchForm';
import GenreSelect from './components/GenreSelect';
import SortControl from './components/SortControl';
import MovieTile from './components/MovieTile';
import MovieDetails from "./components/MovieDetails";

function App() {

  const initialSearch = "Star Wars";

  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [showMovieDetails, setShowMovieDteails] = useState(false);
  const [searchQuery, setSearchTerm] = useState(initialSearch);
  const [genresUnique, setGenres] = useState([]);
  const [active, setActive] = useState(false);
  const [sortSelected, setSortSelected] = useState("release_date");

  useEffect(() => {

    fetch('http://localhost:4000/movies')
      .then((response) => response.json())
      .then((res) => {

        // set the unique "genres" from the object received
        let genresArr = ["All"];
        res.data.forEach(function (value, index, array) {
          genresArr.push(...value.genres)
        });

        let genresUnique = genresArr.filter((value, index, array) => array.indexOf(value) === index);
        setGenres(genresUnique);

        // by default the movies sorted by Release Date
        const sortedList = res.data.sort((a, b) =>
        a.release_date.localeCompare(b.release_date));
        setMovies(sortedList);

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
    setShowMovieDteails(true);
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
    setShowMovieDteails(false);
  }

  return (
    <div className="App">
          <Counter counterNr={0} />
        <div className="pageHeader">
          
          {showMovieDetails
            ? <MovieDetails movie={movieDetails} showSearchHeader={showSearchHeader} />
            : <SearchForm onSearch={handleSearch} searchVal={searchQuery} />
          }

        </div>
        <div className="pageBody">
          <div className="selectSection">
            <GenreSelect onSelect={handleGenreSelect} genres={genresUnique} isActive={active} />
            <SortControl handleSelect={handleSortSelection} />
          </div>
          {movies && <MovieTile movies={movies} handleMovieClick={handleTileClick} sortSelected={sortSelected}/>}
          
        </div>
    </div>
  );
}

export default App;
