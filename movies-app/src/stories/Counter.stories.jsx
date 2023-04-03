import React from 'react';
import Counter from '../components/Counter';

export default {
    title: 'MoviesApp/Counter',
    component: Counter,
};

const Template = (args) => <Counter {...args} />;

export const compCounter = Template.bind({});
compCounter.args = {
    counterNr: 0,
};
