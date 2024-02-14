describe('Scenario CharleBin #1', () => {


  /* ==== Test Created with Cypress Studio ==== */
  it('CharleBin', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('CharleBin', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.visit('http://localhost:3000/?18b9a859bc9a63d4#5Uv11EQ1Q7F6Zj9TuDw6KoTxEC3n3vA9cZ2725LZEbut');

    /* ==== Generated with Cypress Studio ==== */
cy.get('#passworddecrypt').clear('h');
cy.get('#passworddecrypt').type('hello');
cy.get('#passwordform > .btn > .glyphicon').click();
cy.get('#prettyprint').should('have.text', 'Hello World !');
/* ==== End Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  });
})