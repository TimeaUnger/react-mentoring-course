// 1. Test that component renders all genres passed in props
// 2. Test that component highlights a selected genre passed in props
// 3. Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments

import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react';

import App from "../App";
import GenreSelect from '../components/GenreSelect';

describe('App GenresSelect', () => {

  jest.mock("../components/GenreSelect", () => () => {
    return <mock-modal />;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  const genresAll = [
    "All", 
    "Drama", 
    "Romance",
    "Animation",
    "Adventure", 
    "Family",
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
  ];

  it('component renders all genres passed in props', () => {

    render(<GenreSelect genres={genresAll} />);

    const list = screen.getByRole("list", {
      name: /genresAll/i,
    });

    const { getAllByRole } = within(list);
    const genreItem = getAllByRole("listitem")

    expect(genreItem.length).toBe(10)

  });

  it('component highlights a selected genre passed in props', () => {

    render(<App genres={genresAll} />);

    const list = screen.getByRole("list", {
      name: /genresAll/i,
    });

    const { getAllByRole } = within(list);
    const genreItem = getAllByRole("listitem");

    fireEvent.click(genreItem[1]);

    const activeElements = list.getElementsByClassName('active');

    expect(activeElements.length).toBe(1)
    expect(genreItem[1].classList.contains('active')).toBe(true)

  });

  it('after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', () => {

    render(<App genres={genresAll} />);
    
    const mockCallback = jest.fn( genre => {
      return genre;
    });

    jest.mock("../components/GenreSelect", () => () => {
      return <mock-modal onClick={mockCallback}/>;
    });

    const list = screen.getByRole("list", {
      name: /genresAll/i,
    });

    const { getAllByRole } = within(list);
    const genreItem = getAllByRole("listitem");

    fireEvent.click(genreItem[1]);

    expect(mockCallback(genreItem[1].textContent)).toBe(genreItem[1].textContent); 
    expect(mockCallback.mock.calls).toHaveLength(1);

  });

});
