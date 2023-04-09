import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react';

import MovieDetails from '../components/MovieDetails';
import { moviesAll } from '../mocks/Movies';

describe('App MovieDetails', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('component renders the movie passed in props', () => {

    render(<MovieDetails movie={moviesAll[1]}/>);

    const { title, vote_average } = moviesAll[1];
    const movieTitle = screen.getByText(title);
    const movieRating = screen.getByText(vote_average);

    expect(movieTitle).toBeInTheDocument();
    expect(movieRating).toBeInTheDocument();
  
  });

  it('click on search icon calls the handler', () => {
    
    const objInitialProps = {
      movie: moviesAll[1],
      onClick: jest.fn(),
      showSearchHeader: jest.fn()
    }

    const { showSearchHeader } = objInitialProps; 
    const {container} = render(<MovieDetails  {...objInitialProps} />);
    const movieSearch = container.getElementsByClassName('movieSearch');

    fireEvent.click(movieSearch[0]);
    expect(showSearchHeader).toHaveBeenCalledTimes(1);

  });

});
