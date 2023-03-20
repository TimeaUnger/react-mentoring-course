import React, { useState, useEffect} from "react";
import './GenreSelect.css';

const GenreSelect = (props) => {

    const [genres, setGenres] = useState([]);
    useEffect(() => {
      fetch('http://localhost:4000/movies')
         .then((response) => response.json())
         .then((res) => {
            let genresArr = [];
            res.data.forEach(function(value, index, array) {
                genresArr.push(...value.genres)
            }); 

            let genresUnique = genresArr.filter((value, index, array) => array.indexOf(value) === index);
            setGenres(genresUnique)
         })
         .catch((err) => {
            console.log(err.message);
         });
    }, []);

    return (
      <>
        <ul>
          {genres.map((genre, index) =><li key={index}>{ genre }</li>)}
        </ul>
      </>
    );
}

export default GenreSelect;
