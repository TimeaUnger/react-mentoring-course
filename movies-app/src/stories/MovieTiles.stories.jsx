import React from 'react';
import MovieTiles from '../components/MovieTiles';
import { moviesAll } from '../mocks/Movies';

export default {
    title: 'MoviesApp/MovieTiles',
    component: MovieTiles,
};

const Template = (args) => <MovieTiles {...args} />;

export const MovieTile = Template.bind({});
MovieTile.args = {
    movies: moviesAll,
    handleMovieClick: undefined,
};