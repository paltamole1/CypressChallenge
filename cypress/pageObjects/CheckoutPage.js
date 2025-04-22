class CheckoutPage {
   
    get firstNameInput() {
      return cy.get('#firstName'); 
    }
  
    get lastNameInput() {
      return cy.get('#lastName'); 
    }
  
    get addressInput() {
      return cy.get('#address'); 
    }
  
    get cityInput() {
      return cy.get('#city');
    }
  
    get stateSelect() {
      return cy.get('#state'); 
    }
  
    get zipCodeInput() {
        return cy.get('#zipCode'); 
    }
  
    paymentMethodRadio(method) {
        return cy.get(`input[type="radio"][value="${method}"]`);
    }
    
  
    get cardNumberInput() {
      return cy.get('#cardNumber');
    }
  
    get expiryDateInput() {
      return cy.get('#expiryDate'); 
    }
  
    get cvvInput() {
      return cy.get('#cvv');
    }
  
    get placeOrderButton() {
      return cy.get('#placeOrder'); 
    }
  
    get orderSummary() {
      return cy.get('.order-summary'); 
    }
  
    get totalAmount() {
      return cy.get('.total-amount');
    }
  
    get successMessage() {
      return cy.get('.success-message');
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

    selectPaymentMethod(method) {
        this.paymentMethodRadio(method).check();
    } 
  
    typeAddress(address) {
      this.addressInput.type(address);
    }
  
    typeCity(city) {
      this.cityInput.type(city);
    }
  
    selectState(state) {
      this.stateSelect.select(state);
    }
  
    typeZipCode(zipCode) {
      this.zipCodeInput.type(zipCode);
    }
  
    selectPaymentMethod(method) {
      this.paymentMethodRadio(method).check();
    }
  
    typeCardNumber(cardNumber) {
      this.cardNumberInput.type(cardNumber);
    }
  
    typeExpiryDate(expiryDate) {
      this.expiryDateInput.type(expiryDate);
    }
  
    typeCvv(cvv) {
      this.cvvInput.type(cvv);
    }
  
    clickPlaceOrderButton() {
      this.placeOrderButton.click();
    }
  
    verifyOrderSummaryIsVisible() {
      this.orderSummary.should('be.visible');
    }
  
    verifyTotalAmountContains(expectedAmount) {
      this.totalAmount.should('contain', expectedAmount);
    }
  
    verifySuccessMessageIsVisible() {
      this.successMessage.should('be.visible');
    }
  
    verifyErrorMessageContains(expectedMessage) {
      this.errorMessage.should('be.visible').and('contain', expectedMessage);
    }
  
    visit() {
      cy.visit('/checkout'); 
    }
  }
  
  export default CheckoutPage;