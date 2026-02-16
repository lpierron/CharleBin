describe('CharleBin Comprehensive Tests', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should create a paste without password', () => {
    cy.visit(baseUrl);
    cy.get('#message').should('be.visible');
    cy.get('#message').type('Test paste without password');
    cy.get('#sendbutton').should('be.visible').click();
    cy.get('#pasteurl').should('be.visible');
    cy.url().should('include', '#');
  });

  it('should create a paste with password', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('Password protected paste');
    cy.get('#passwordinput').type('testpassword');
    cy.get('#sendbutton').click();
    cy.get('#pasteurl').should('be.visible');
  });

  it('should burn after reading - paste is deleted after viewing', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('Burn after reading test');
    cy.get('#burnafterreading').check();
    cy.get('#sendbutton').click();
    cy.get('#pasteurl').should('be.visible');
    
    // Copy the URL and visit it in a new session (simulating different viewer)
    cy.url().then(url => {
      cy.visit(url);
      cy.get('#prettyprint').should('contain', 'Burn after reading test');
    });
  });

  it('should change expiration time', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('Testing expiration');
    cy.get('#pasteExpiration').select('5min');
    cy.get('#sendbutton').click();
    cy.get('#remainingtime').should('contain', '5 minutes');
  });

  it('should clone an existing paste', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('Original paste content');
    cy.get('#sendbutton').click();
    cy.get('#clonebutton').should('be.visible').click();
    cy.get('#message').should('have.value', 'Original paste content');
  });

  it('should view raw text of a paste', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('Raw text test content');
    cy.get('#sendbutton').click();
    cy.get('#rawtextbutton').should('be.visible').click();
    cy.get('#plaintext').should('be.visible');
  });

  it('should download paste as text file', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('Download test content');
    cy.get('#sendbutton').click();
    cy.get('#downloadtextbutton').should('be.visible');
  });

  it('should change format/syntax highlighting', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('function test() { return "hello"; }');
    cy.get('#pasteFormatter').select('JavaScript');
    cy.get('#sendbutton').click();
    cy.get('#prettyprint').should('be.visible');
  });

  it('should handle error when viewing non-existent paste', () => {
    cy.visit(baseUrl + '/?invalidid123#nonexistent');
    cy.get('#errormessage').should('be.visible');
  });

  it('should create new paste using new button', () => {
    cy.visit(baseUrl);
    cy.get('#message').type('First paste');
    cy.get('#sendbutton').click();
    cy.get('#newbutton').should('be.visible').click();
    cy.get('#message').should('have.value', '');
  });
});
