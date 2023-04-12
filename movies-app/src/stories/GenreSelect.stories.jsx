import React from 'react';
import GenreSelect from '../components/GenreSelect';
import{ action, actions } from '@storybook/addon-actions';

export default {
    title: 'MoviesApp/GenreSelect',
    component: GenreSelect,
};

const Template = (args) => <GenreSelect {...args} />;
const genres = [
    "All", 
    "Drama", 
    "Romance", 
    "Animation", 
    "Advaneture",
    "Family", 
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
]
export const GenreSelectNavigation = Template.bind({});

GenreSelectNavigation.args = {
    genres: genres,
};