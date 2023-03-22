import React from 'react';
import { createElement } from 'react';
import './Counter.css';

class Counter extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            counterNr: props.counterNr,
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.resetCount = this.resetCount.bind(this);
    }

    increment = () => {
        this.setState({
            counterNr: this.state.counterNr + 1,
        });
    }

    decrement = () => {
        this.setState({
            counterNr: this.state.counterNr - 1,
        });
    }

    resetCount = () => {
        this.setState({
            counterNr: 0,
        });
    }

    render() {
        return createElement(

            'div',
                { className: 'counterWrapper' },
                createElement('h3', null, 'Count'),
                createElement('span',null, this.state.counterNr),
                createElement('div', {className: 'buttonsWrapper'},
                    createElement('button', {onClick: this.decrement}, 'Decrement'),
                    createElement('button', {onClick: this.increment}, 'Increment'),  
                ),
                createElement('button', {onClick: this.resetCount}, 'Reset'),
        );
    }
}
export default Counter;

