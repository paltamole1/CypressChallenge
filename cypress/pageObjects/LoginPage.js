class LoginPage {

    get emailInput() {
      return cy.get('#email'); 
    }
  
    get passwordInput() {
      return cy.get('#password'); 
    }
  
    get loginButton() {
      return cy.get('button[type="submit"]'); 
    }
  
    get errorMessage() {
      return cy.get('.error-message'); 
    }
  
    get forgotPasswordLink() {
      return cy.get('a[href="/forgot-password"]'); 
    }
  
    typeEmail(email) {
      this.emailInput.type(email);
    }
  
    typePassword(password) {
      this.passwordInput.type(password);
    }
  
    clickLoginButton() {
      this.loginButton.click();
    }
  
    clickForgotPasswordLink() {
      this.forgotPasswordLink.click();
    }
  
    verifyErrorMessage(expectedMessage) {
      this.errorMessage.should('be.visible').and('contain', expectedMessage);
    }
  
    visit() {
      cy.visit('/login');
    }
  }
  
  export default new LoginPage();