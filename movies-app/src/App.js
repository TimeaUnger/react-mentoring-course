import React, { useState} from "react";
import './App.css';
// import Counter from './components/Counter';
import SearchForm from './components/SearchForm'
import GenreSelect from './components/GenreSelect'

function App() {

  const initialSearch = {
    searchQuery: 'Star Wars',
    id: '181808'
  };

  const [searchQuery, setSearchTerm] = useState(initialSearch);

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
    console.log(searchQuery)
  }

  const handleGenreSelect = (selectedGenre) => {
    console.log(selectedGenre)
  }

  return (
    <div className="App">
      <div className="header">
        {/* <Counter counterNr={0} /> */}
        <SearchForm onSearch={handleSearch} searchVal={searchQuery} />
      </div>
      <div className="pageContent">
        <GenreSelect onSelect={handleGenreSelect}/>
      </div>
    </div>
  );
}

export default App;
