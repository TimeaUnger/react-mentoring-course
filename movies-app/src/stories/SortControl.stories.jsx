import React from 'react';
import SortControl from '../components/SortControl';
import{ action, actions } from '@storybook/addon-actions';

export default {
    title: 'MoviesApp/SortControl',
    component: SortControl,
};

const Template = (args) => <SortControl {...args} />;

export const SortBy = Template.bind({});

SortBy.args = {
    handleSelect: () => {}
};