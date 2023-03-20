import React, { useState} from "react";
import './App.css';
import Counter from './components/Counter';
import SearchForm from './components/SearchForm'

function App() {

  const initialSearch = {
    searchQuery: 'Star Wars',
    id: '181808'
  };

  const [searchQuery, setSearchTerm] = useState(initialSearch);

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  }

  return (
    <div className="App">

      <Counter counterNr={0} />
      <SearchForm onSearch={handleSearch} searchVal={searchQuery} />
      
    </div>
  );
}

export default App;
