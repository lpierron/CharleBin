describe('CharleBin Comprehensive Tests', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(baseUrl);
    // Wait for the page to fully load
    cy.get('#message', { timeout: 10000 }).should('be.visible');
  });

  // Wait 10 seconds between tests to avoid rate limiting
  afterEach(() => {
    cy.wait(10500);
  });

  it('should create a paste without password', () => {
    cy.get('#message').type('Test paste without password');
    cy.get('#sendbutton').click();
    cy.get('#pasteurl', { timeout: 10000 }).should('be.visible');
    cy.url().should('include', '#');
  });

  it('should create a paste with password and decrypt it', () => {
    cy.get('#message').type('Password protected paste');
    cy.get('#passwordinput').type('testpassword');
    cy.get('#sendbutton').click();
    
    // Click the paste URL to open the paste (required to show password dialog)
    cy.get('#pasteurl').click();
    // Wait for the password decrypt form to appear
    cy.get('#passworddecrypt', { timeout: 10000 }).should('be.visible');
    cy.get('#passworddecrypt').type('testpassword');
    cy.get('#passwordform > .btn').click();
    cy.get('#prettyprint').should('contain', 'Password protected paste');
  });

  it('should burn after reading - paste is deleted after viewing', () => {
    cy.get('#message').type('Burn after reading test');
    cy.get('#burnafterreading').check();
    cy.get('#passwordinput').type('testpassword');
    cy.get('#sendbutton').click();
    cy.get('#pasteurl', { timeout: 10000 }).should('be.visible');
    
    // Copy the URL and visit it in a new session (simulating different viewer)
    cy.url().then(url => {
      cy.visit(url);
      cy.get('#passworddecrypt', { timeout: 10000 }).should('be.visible');
      cy.get('#passworddecrypt').type('testpassword');
      cy.get('#passwordform > .btn').click();
      cy.get('#prettyprint').should('contain', 'Burn after reading test');
    });
  });

  it('should change expiration time', () => {
    cy.get('#message').type('Testing expiration');
    cy.get('#pasteExpiration').select('5min');
    cy.get('#sendbutton').click();
    cy.get('#remainingtime', { timeout: 10000 }).should('contain', '5');
  });

  it('should clone an existing paste', () => {
    cy.get('#message').type('Original paste content');
    cy.get('#sendbutton').click();
    cy.get('#clonebutton', { timeout: 10000 }).should('be.visible').click();
    cy.get('#message').should('contain', 'Original paste content');
  });

  it('should view raw text of a paste', () => {
    cy.get('#message').type('Raw text test content');
    cy.get('#sendbutton').click();
    cy.get('#rawtextbutton', { timeout: 10000 }).should('be.visible').click();
    cy.get('#plaintext').should('be.visible');
  });

  it('should download paste as text file', () => {
    cy.get('#message').type('Download test content');
    cy.get('#sendbutton').click();
    cy.get('#downloadtextbutton', { timeout: 10000 }).should('be.visible');
  });

  it('should change format/syntax highlighting', () => {
    cy.get('#message').type('function test() { return "hello"; }');
    cy.get('#pasteFormatter').select('JavaScript');
    cy.get('#sendbutton').click();
    cy.get('#prettyprint', { timeout: 10000 }).should('be.visible');
  });

  it('should handle error when viewing non-existent paste', () => {
    cy.visit(baseUrl + '/?invalidid123#nonexistent');
    cy.get('#errormessage', { timeout: 10000 }).should('be.visible');
  });

  it('should create new paste using new button', () => {
    cy.get('#message').type('First paste');
    cy.get('#sendbutton').click();
    cy.get('#newbutton', { timeout: 10000 }).should('be.visible').click();
    cy.get('#message').should('have.value', '');
  });
});
