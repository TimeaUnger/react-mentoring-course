import React, { useState, useEffect} from "react";
import './GenreSelect.css';

const GenreSelect = (props) => {
    
    // const [genres, setGenres] = useState(props.genres || []);
    // const [active, setActive] = useState(false)

    // useEffect(() => {
    //   fetch('http://localhost:4000/movies')
    //      .then((response) => response.json())
    //      .then((res) => {
    //         let genresArr = ["All"];
    //         res.data.forEach(function(value, index, array) {
    //             genresArr.push(...value.genres)
    //         }); 

    //         let genresUnique = genresArr.filter((value, index, array) => array.indexOf(value) === index);
    //         setGenres(genresUnique)
    //      })
    //      .catch((err) => {
    //         console.log(err.message);
    //      });
    // }, []);

    const onSelectHandler = (event) => {
      const genre = event.target.innerHTML;
      props.onSelect(genre) 
    }

    return (
      <div className="genreSelect">
        <ul data-testid="GenreListItem" aria-label="genresAll">
          {props.genres.map((genre, index) => {
            return (
              <li
                key={index} 
                onClick={onSelectHandler}
                className={`genreItem ${props.isActive === genre && 'active'}`}
              >
                { genre }
              </li>
            )
          })}
        </ul>
      </div>
    );
}

export default GenreSelect;