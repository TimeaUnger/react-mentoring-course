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

    render() {
        return createElement(

            'div',
                { className: 'counterWrapper'},
                createElement('button', {className: 'counterDecrement', onClick: this.decrement, 'data-testid': 'counterDecrement'}, 'Decrement'),
                createElement('span',{className: 'counterNr', 'data-testid': 'counterValue'}, this.state.counterNr),
                createElement('button', {className: 'counterIncrement', onClick: this.increment, 'data-testid': 'counterIncrement'}, 'Increment'),             
                
        );
    }
}
export default Counter;

