import React, { useState } from "react";
import "./SortControl.css";

const SortControl = (props) => {
  const { selectedSortOption } = props;

  const handleSortSelect = (e) => {
    const selectedOption = e.target.value;
    props.handleSortSelection(selectedOption, selectedSortOption);
  };

  return (
    <div className="sortControlWrapper">
      <span className="sortByLabel">SortBy</span>
      <span className="sortByControl">
        <select
          className="sortBySelect"
          onChange={handleSortSelect}
          value={selectedSortOption}
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
