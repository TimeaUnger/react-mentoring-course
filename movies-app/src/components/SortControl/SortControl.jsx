import React, { useState } from "react";
import "./SortControl.css";
import { useSearchParams, useLocation } from "react-router-dom";

const SortControl = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});

  const activeGenre =searchParams.get("activeGenre") || "All";
  const searchQuery = searchParams.get("search") || "";

  const sortOption = search !== "" ? searchParams.get("sortBy") : "release_date";

  const handleSortSelect = (e) => {
    const selectedOption = e.target.value;

    if (activeGenre === "All") {
      setSearchParams({
        search: searchQuery,
        searchBy: "title",
        sortBy: selectedOption,
        activeGenre: activeGenre,
      });
    } else {
      setSearchParams({
        search: searchQuery,
        searchBy: "genres",
        sortBy: selectedOption,
        activeGenre: activeGenre,
      });
    }
  };

  return (
    <div className="sortControlWrapper">
      <span className="sortByLabel">SortBy</span>
      <span className="sortByControl">
        <select
          className="sortBySelect"
          onChange={handleSortSelect}
          value={sortOption}
        >
          <option className="sortOption" value="release_date">
            Release Date
          </option>
          <option className="sortOption" value="title">
            Title
          </option>
        </select>
      </span>
    </div>
  );
};

export default SortControl;
