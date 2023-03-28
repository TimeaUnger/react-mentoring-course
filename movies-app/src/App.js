import React, { useState} from "react";
import './App.css';
import Counter from './components/Counter';
import SearchForm from './components/SearchForm'
import GenreSelect from './components/GenreSelect'

function App() {

  /* Search Movie */
  // const initialSearch = {
  //   searchQuery: 'Star Wars',
  //   id: '181808'
  // };

  const initialSearch = "Star Wars";

  /* Genres */
  const genresAll = [
      "All", 
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

  const [searchQuery, setSearchTerm] = useState(initialSearch);
  const [active, setActive] = useState(false)

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  }

  const handleGenreSelect = (selectedGenre) => {
    setActive(selectedGenre)
  }

  return (
    <div className="App">
      <div className="header">
        <Counter counterNr={0} />
        <SearchForm onSearch={handleSearch} searchVal={searchQuery} />
      </div>
      <div className="pageContent">
        <GenreSelect onSelect={handleGenreSelect} genres={genresAll} isActive={active}/>
      </div>
    </div>
  );
}

export default App;
