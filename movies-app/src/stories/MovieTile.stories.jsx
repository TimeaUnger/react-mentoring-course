import React from 'react';
import MovieTile from '../components/MovieTile';
import { moviesAll } from '../mocks/Movies';

export default {
    title: 'MoviesApp/MovieTile',
    component: MovieTile,
};

const Template = (args) => <MovieTile {...args} />;

export const MovieTiles = Template.bind({});
MovieTiles.args = {
    movies: moviesAll,
    handleMovieClick: undefined,
};