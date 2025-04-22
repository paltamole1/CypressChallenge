class RegistrationPage {
    get firstNameInput() {
      return cy.get('#firstName');
    }
  
    get lastNameInput() {
      return cy.get('#lastName');
    }
  
    get emailInput() {
      return cy.get('#email'); 
    }
  
    get passwordInput() {
      return cy.get('#password'); 
    }
  
    get confirmPasswordInput() {
      return cy.get('#confirmPassword'); 
    }
  
    get registerButton() {
      return cy.get('button[type="submit"]'); 
    }
  
    get errorMessage() {
      return cy.get('.error-message');
    }

    typeFirstName(firstName) {
      this.firstNameInput.type(firstName);
    }
  
    typeLastName(lastName) {
      this.lastNameInput.type(lastName);
    }
  
    typeEmail(email) {
      this.emailInput.type(email);
    }
  
    typePassword(password) {
      this.passwordInput.type(password);
    }
  
    typeConfirmPassword(confirmPassword) {
      this.confirmPasswordInput.type(confirmPassword);
    }
  
    clickRegisterButton() {
      this.registerButton.click();
    }
  
    verifyErrorMessage(expectedMessage) {
      this.errorMessage.should('be.visible').and('contain', expectedMessage);
    }
  
    visit() {
      cy.visit('/register');
    }
  }
  
  export default new RegistrationPage();