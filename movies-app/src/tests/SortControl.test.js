import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import SortControl from '../components/SortControl';

describe('App SortControl', () => {
 
  it('select an option and passing the option properly ', () => {

    const objInitialProps = {
      onChange: jest.fn(),
      handleSelect: jest.fn()
    }
    const {container} = render(<SortControl {...objInitialProps} />);
    const sortOption = container.getElementsByClassName('sortOption');
    const {handleSelect} = objInitialProps;

    userEvent.selectOptions(        
        screen.getByRole('combobox'),        
        sortOption[1]    
    )
  
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toBeCalledWith(sortOption[1].value); 
  
  });

});


