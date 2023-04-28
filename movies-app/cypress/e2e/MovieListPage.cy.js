describe('MoviesListPage spec', () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000")
    cy.viewport(1780, 2500)
  })

  it('sortBy should render movieTiles according to the selected option', () => {
    cy.get('.sortBySelect').select(1)
    cy.get('.MovieListPage').should('have.length', 1);
  });

  it('add movie button click should show the dialog with empty form', () => {

    cy.get('.addMovie').click();
    cy.get('.movieFormWrapper').should('be.visible');
    cy.get('.movieTitleInput').should('have.value', '');

  });

  it('click on genre should be highlighted', () => {
    cy.get('.genreItem').eq(2).click().should('have.class', 'active');
  });

  it('click on genre loads the movieTiles by genre selected', () => {

    cy.get('.genreItem').eq(2).click().then($value => {
      const genre = $value.text()      
      cy.get('.movieGenre').contains(genre)
    });

  });

  it('click on movieTile should show the selected movie details instead of search header', () => {

    // check the relevant movie details header is visible
    cy.get('.movieImage').eq(2).click();
    cy.get('.movieDetailsContainer').should('be.visible');

    // check if the loaded movie details is matching with the clicked movie tile
    cy.get('.movieTileDetails .movieTitle').eq(2).then($value => { 
      const movieTileTitle = $value.text()      
      cy.get('.movieDetailsTitle').contains(movieTileTitle);
    });
    
  });

  it('click on movieDetails search icon should show the search header instead of movieDetails', () => {

    cy.get('.movieImage').eq(2).click();
    cy.get('.movieDetailsContainer .movieSearch').click();
    cy.get('.searchWrapper').should('be.visible');
    
  });

  it('click on menu button on movieTile should show the menu edit/delete movie', () => {

    cy.get('#navButton').click();
    cy.get('.editDeleteRowsWrapper').should('be.visible');
    
  });

  it('click on edit movie shoudld show form dialog with the relevant movie details', () => {

    cy.get('.movieTileWrapper #navButton').eq(2).click();
    cy.get('#editMovie').click();
    cy.get('.movieFormWrapper').should('be.visible');

    cy.get('.movieTileDetails .movieTitle').eq(2).then($value => { 
      const movieTileTitle = $value.text()      
      cy.get('.movieFormContent #movieTitle').should('have.value', movieTileTitle);
    });

  });

  it('click on movieFormdialog "X" button should close the dialog', () => {

    cy.get('.addMovie').click();
    cy.get('.closeButton').click();
    cy.get('.movieFormWrapper').should('not.exist');

  });

  
  it('click on movieFormdialog "Confirm" button should close the dialog', () => {

    cy.get('.movieTileWrapper #navButton').eq(2).click();
    cy.get('#deleteMovie').click();

    cy.get('.deleteMovieFooter .movieFormSubmitBtn').click();
    cy.get('.movieFormWrapper').should('not.exist');

  });

  it('click on movieFormdialog "Submit" button should close the dialog', () => {

    cy.get('.movieTileWrapper #navButton').eq(2).click();
    cy.get('#deleteMovie').click();

    cy.get('.movieFormSubmitBtn').click();
    cy.get('.movieFormWrapper').should('not.exist');

  });

  it('type search query in the searchForm, click "enter" should render relevant movies', () => {

    cy.get('.searchInput input').type('test{enter}');

    cy.get('.foundMoviesNr').then($value => { 
      
      const foundMoviesNr = $value.text()      
      
      if(foundMoviesNr > 0){
        cy.get('.movieTileWrapper .movieTitle').contains('test');
      }
      else{
        cy.get('.movieTileWrapper').should('not.exist');;
      }

    });
    
  });

  it('type search query in the searchForm, click "serach" button should render relevant movies', () => {

    cy.get('.searchInput input').type('test');
    cy.get('.searchButton button').click();

    cy.get('.foundMoviesNr').then($value => { 
      
      const foundMoviesNr = $value.text()      
      
      if(foundMoviesNr > 0){
        cy.get('.movieTileWrapper .movieTitle').contains('test');
      }
      else{
        cy.get('.movieTileWrapper').should('not.exist');;
      }
    });
    
  });

  // URL test
  it('after clicking on movie tile url should contain the relavant id', () => {

    cy.get('.movieImage').eq(2).click();
    cy.get('.movieTilesWrapper a').eq(2).invoke('attr', 'href')
    .then(href => {

      console.log(`href is ${href}`)
      cy.url().should('eq', Cypress.config().baseUrl + href)

    });
  });

  it('after clicking on genre the url should contain the relavant search params', () => {

    cy.get('.genreItem').eq(2).click().invoke('text')
      .then(genreItem => {

        const reqUrl = `?search=${genreItem}&searchBy=genres&sortBy=release_date&activeGenre=${genreItem}`;
        cy.location('search').should('equal', reqUrl);

      });
  });

  it('after clicking on genre the the clicked genre should be active', () => {

    cy.get('.genreItem').should('have.class', 'active');
    cy.get('.genreItem.active').should('have.length', 1)

  });

  it('after selecting sort the url should contain the relavant selected sort and active genre', () => {

    cy.get('.genreItem').eq(2).click().invoke('text').then(activeGenre => { 

      cy.get('.sortBySelect').select(1).invoke('val')
      .then(sortSelected => {

        const reqUrl = `?search=${activeGenre}&searchBy=genres&sortBy=${sortSelected}&activeGenre=${activeGenre}`;
        cy.location('search').should('equal', reqUrl);
      });
    });

  });

  it('after clicking on movie details search icon url should change back to the root with the previous state of the url search ', () => {

    // select genre
    cy.get('.genreItem').eq(2).click()
    // select movie to show details
    cy.get('.movieImage').eq(2).click();
    // get the current serach params
    cy.location('search').then((prevUrl)=>{
      // click on search icon
      cy.get('.movieSearch').click();
      // match url the loaded url with the previous url
      cy.location('search').should('equal', prevUrl);
    });

  });

  it('after searching on a movie the url should conatain the searched movie parameter as value ', () => {

    cy.get('.searchInput input').type('test{enter}');
    cy.location('search').should('equal', '?search=test&searchBy=title&sortBy=release_date&activeGenre=All') 
  });
  
});
