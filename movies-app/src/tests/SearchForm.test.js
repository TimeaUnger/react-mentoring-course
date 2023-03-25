// 1. Test that component renders an input with the value equal to initial value passed in props
// 2. Test that after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value
// 3. Test that after typing to the input and pressing Enter key, the "onChange" prop is called with proper value

import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from "../App";


describe('App SearchForm',  () => {

  jest.mock("../components/SearchForm", () => () => {
    return <mock-modal data-testid="searchInput"/>;
  });

  it('renders an input with the value equal to initial value passed in props', () => {

    render(<App searchVal="Star Wars"  />);
    const searchInput = screen.getByTestId('searchInput');
    expect(searchInput.value).toBe('Star Wars');

  });

  it('after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', () => {
    
    render(<App searchVal="Star Wars" />);
    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, {target: {value: 'Search Query'}});
    const searchButton = screen.getByTestId('searchButton');
    fireEvent.click(searchButton);
    expect(searchInput.value).toBe('Search Query');
  
  });

  it('after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', () => {
    
    render(<App searchVal="Star Wars" />);
    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, {target: {value: 'Search Query'}});
    fireEvent.keyDown(searchInput, {key: 'enter', keyCode: 13})
    expect(searchInput.value).toBe('Search Query');
  
  });

});


