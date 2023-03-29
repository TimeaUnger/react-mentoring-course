import React, { useState} from "react";
import './SearchForm.css';

const SearchForm = (props) => {
    
    const [searchVal, setSearchVal] = useState(props.searchVal);

    const handleSearch = (event) => {

        if (event.keyCode === 13){
            props.onSearch(searchVal);
        }

        if(event.type === "focus"){
            props.onSearch(searchVal);
        }
    };

    const handleBtnClick = () => { 
        props.onSearch(searchVal);
    }
    
    const inputHandler = (event) => {
        
        setSearchVal(event.target.value)
    }

    return (
        <div className="searchWrapper">
            <div className="searchInput">
                <input
                    type="search"
                    data-testid="searchInput"
                    placeholder="Search movie"
                    onKeyDown={handleSearch}
                    onFocus={handleSearch}
                    onChange={inputHandler}
                    value={searchVal}
                />
            </div>
           <div className="searchButton">
                <button data-testid="searchButton" onClick={handleBtnClick} >Search</button>
           </div>
        </div>
    )

}
export default SearchForm;
