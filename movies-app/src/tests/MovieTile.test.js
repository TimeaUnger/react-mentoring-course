import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react';

import MovieTile from '../components/MovieTile';
import { moviesAll } from '../mocks/Movies';

describe('App MovieTile', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('component renders all movies passed in props', () => {

    const {container} = render(<MovieTile movies={moviesAll} />);
    const movieTile = container.getElementsByClassName('movieTile');

    expect(movieTile.length).toBe(10);
  
  });

  it('after a click event on a tile component calls "onClick" callback and passes correct movie in arguments', () => {
    
    const mockFn = jest.fn();
    const mockCallback = jest.fn( movie => {
      return movie;
    });

    const {container} = render(<MovieTile movies={moviesAll} onClick={mockCallback} handleMovieClick={mockFn}/>);
    const movieTiles = container.getElementsByClassName('movieTile');

    fireEvent.click(movieTiles[1]);

    expect(mockCallback(moviesAll[1])).toMatchObject(moviesAll[1]);
    expect(mockCallback.mock.calls).toHaveLength(1);

  });

});
