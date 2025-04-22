import LoginPage from '../pageObjects/LoginPage';

describe('User Login', { retries: 2 }, () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Should allow logging in with valid credentials', () => {
    cy.fixture('loginUsers').then((users) => {
      const validUser = users.validUser;
      LoginPage.typeEmail(validUser.email);
      LoginPage.typePassword(validUser.password);
      LoginPage.clickLoginButton();

      cy.url().should('not.include', '/login');
      cy.contains('Welcome').should('be.visible');
     
    });
  });

  it('Should display an error message with invalid credentials', () => {
    cy.fixture('loginUsers').then((users) => {
      const invalidUser = users.invalidUser;
      LoginPage.typeEmail(invalidUser.email);
      LoginPage.typePassword(invalidUser.password);
      LoginPage.clickLoginButton();

      LoginPage.verifyErrorMessage(invalidUser.errorMessage);
    });
  });

  it('Should display an error message with invalid email format', () => {
    cy.fixture('loginUsers').then((users) => {
      const invalidEmailFormatUser = users.invalidEmailFormatUser;
      LoginPage.typeEmail(invalidEmailFormatUser.email);
      LoginPage.typePassword(invalidEmailFormatUser.password);
      LoginPage.clickLoginButton();

      LoginPage.verifyErrorMessage(invalidEmailFormatUser.errorMessage);
    });
  });
});