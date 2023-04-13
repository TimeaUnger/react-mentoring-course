import React from 'react';
import MovieDetails from '../components/MovieDetails';

export default {
    title: 'MoviesApp/MovieDetails',
    component: MovieDetails,
};

const Template = (args) => <MovieDetails {...args} />;

export const MovieDetailsHeader = Template.bind({});
MovieDetailsHeader.args = {
    movie: {
      "id": 321612,
      "title": "Beauty and the Beast",
      "tagline": "Be our guest.",
      "vote_average": 6.8,
      "vote_count": 7861,
      "release_date": "2017-03-16",
      "poster_path": "https://image.tmdb.org/t/p/w500/tWqifoYuwLETmmasnGHO7xBjEtt.jpg",
      "overview": "A live-action adaptation of Disney's version of the classic tale of a cursed prince and a beautiful young woman who helps him break the spell.",
      "budget": 160000000,
      "revenue": 1263521126,
      "genres": [
          "Family",
          "Fantasy",
          "Romance"
      ],
      "runtime": 129
    },
};
