import RegistrationPage from '../pageObjects/RegistrationPage';

describe('User Registration', { retries: 2 }, () => {
  beforeEach(() => {
    cy.log('--- Visiting the Registration page ---');
    RegistrationPage.visit();
  });

  it('Should allow registering a user with valid credentials', () => {
    cy.fixture('users').then((users) => {
      const validUser = users.validUser;
      cy.log('--- Attempting registration with valid credentials ---');
      cy.log(`First Name: ${validUser.firstName}`);
      cy.log(`Last Name: ${validUser.lastName}`);
      cy.log(`Email: ${validUser.email}`);

      RegistrationPage.typeFirstName(validUser.firstName);
      RegistrationPage.typeLastName(validUser.lastName);
      RegistrationPage.typeEmail(validUser.email);
      RegistrationPage.typePassword(validUser.password);
      RegistrationPage.typeConfirmPassword(validUser.confirmPassword);
      RegistrationPage.clickRegisterButton();

      cy.log('--- Verifying successful registration... ---');
      cy.url().should('include', '/registration-success');
      cy.contains('Successful Registration').should('be.visible');
    });
  });

  it('Should display an error message if passwords do not match', () => {
    cy.fixture('users').then((users) => {
      const mismatchedPasswordsUser = users.mismatchedPasswordsUser;
      cy.log('--- Attempting registration with mismatched passwords ---');
      cy.log(`Email: ${mismatchedPasswordsUser.email}`);

      RegistrationPage.typeFirstName(mismatchedPasswordsUser.firstName);
      RegistrationPage.typeLastName(mismatchedPasswordsUser.lastName);
      RegistrationPage.typeEmail(mismatchedPasswordsUser.email);
      RegistrationPage.typePassword(mismatchedPasswordsUser.password);
      RegistrationPage.typeConfirmPassword(mismatchedPasswordsUser.confirmPassword);
      RegistrationPage.clickRegisterButton();

      cy.log('--- Verifying error message... ---');
      RegistrationPage.verifyErrorMessage('Passwords do not match');
    });
  });
});