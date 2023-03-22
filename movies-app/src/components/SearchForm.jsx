import React, { useState} from "react";
import './SearchForm.css';

const SearchForm = (props) => {

    const initialState = {
        searchVal: props.searchVal.searchQuery
    };

    const [searchVal, setSearchVal] = useState(initialState);

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
                    placeholder="Search movie"
                    onKeyDown={handleSearch}
                    onFocus={handleSearch}
                    onChange={inputHandler}
                    val={searchVal}
                />
            </div>
           <div className="searchButton">
                <button onClick={handleBtnClick} >Search</button>
           </div>
        </div>
    )

}
export default SearchForm;
