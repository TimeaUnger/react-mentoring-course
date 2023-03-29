// 1. Test that component renders initial value provided in props
// 2. Test that a click event on "decrement" button decrements the displayed value
// 3. Test that a click event on "increment" button increments the displayed value

import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';

import Counter from '../components/Counter';

describe('App Counter', () => {
 
  it('component renders initial value provided in props', () => {

    render(<Counter counterNr="0"/>)
    const counter = screen.getByTestId('counterValue');
    expect(counter).toHaveTextContent('0')

  });

  it('click event on "decrement" button decrements the displayed value', () => {

    render(<Counter counterNr="0"/>)
    const decrementBtn = screen.getByTestId('counterDecrement');
    const counter = screen.getByTestId('counterValue');
    fireEvent.click(decrementBtn)
    expect(counter).toHaveTextContent('-1')

  });

  it('click event on "decrement" button increments the displayed value', () => {

    render(<Counter counterNr="0"/>)
    const incrementBtn = screen.getByTestId('counterIncrement');
    const counter = screen.getByTestId('counterValue');
    fireEvent.click(incrementBtn);
    expect(counter).toHaveTextContent('1')

  });

});


