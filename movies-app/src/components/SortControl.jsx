/*
    This component will render a label "Sort by" and a select control to the right. Select should have the following options:

        - Release Date
        - Title

    The component should take a property that specifies current selection. 
    Additionally, it should take a callback property to handle selection changes. 
    The callback should be called every time a user changes "Sort by" value. 
    The new value should be passed in callback arguments.

    Use Storybook when implementing every individual component. Write a story for every component you create. 
    It will help you to check the result and play around with some interactivity before you embed components into the app.

    Although, it's not required to implement high-fidelity design as per design prototype, 
    it still makes sense to apply some styling to your components, so that you practice in styling React components 
    and your final result looks good.
*/

import React from "react";
import './SortControl.css';

const SortControl = (props) => {

  const handleSelect = (e) => {

    const selectOption = e.target.value;
    props.handleSelect(selectOption);
  }

  return (
    <div className="sortControlWrapper">
      <span className="sortByLabel">SortBy</span>
      <span className="sortByControl">
        <select onChange={handleSelect}>
          <option className="sortOption" value="release_date">Release Date</option>
          <option className="sortOption" value="title">Title</option>
        </select>
      </span>
    </div>
  )
}

export default SortControl;

