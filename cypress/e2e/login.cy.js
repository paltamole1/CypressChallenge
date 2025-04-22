import LoginPage from '../pageObjects/LoginPage';

describe('User Login', { retries: 2 }, () => {
  beforeEach(() => {
    cy.log('--- Visiting the Login page ---');
    LoginPage.visit();
  });

  it('Should allow logging in with valid credentials', () => {
    cy.fixture('loginUsers').then((users) => {
      const validUser = users.validUser;
      cy.log('--- Attempting login with valid credentials ---');
      cy.log(`Email: ${validUser.email}`);
      LoginPage.typeEmail(validUser.email);
      LoginPage.typePassword(validUser.password);
      LoginPage.clickLoginButton();

      cy.log('--- Verifying successful login... ---');
      cy.url().should('not.include', '/login');
      cy.contains('Welcome').should('be.visible');
    });
  });

  it('Should display an error message with invalid credentials', () => {
    cy.fixture('loginUsers').then((users) => {
      const invalidUser = users.invalidUser;
      cy.log('--- Attempting login with invalid credentials ---');
      cy.log(`Email: ${invalidUser.email}`);
      LoginPage.typeEmail(invalidUser.email);
      LoginPage.typePassword(invalidUser.password);
      LoginPage.clickLoginButton();

      cy.log('--- Verifying error message... ---');
      LoginPage.verifyErrorMessage(invalidUser.errorMessage);
    });
  });

  it('Should display an error message with invalid email format', () => {
    cy.fixture('loginUsers').then((users) => {
      const invalidEmailFormatUser = users.invalidEmailFormatUser;
      cy.log('--- Attempting login with invalid email format ---');
      cy.log(`Email: ${invalidEmailFormatUser.email}`);
      LoginPage.typeEmail(invalidEmailFormatUser.email);
      LoginPage.typePassword(invalidEmailFormatUser.password);
      LoginPage.clickLoginButton();

      cy.log('--- Verifying error message... ---');
      LoginPage.verifyErrorMessage(invalidEmailFormatUser.errorMessage);
    });
  });
});