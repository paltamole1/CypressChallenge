class CartPage {
    
    get cartItems() {
      return cy.get('.cart-item'); 
    }
  
    getItemName(index) {
      return this.cartItems.eq(index).find('.item-name');
    }
  
    getItemPrice(index) {
      return this.cartItems.eq(index).find('.item-price'); 
    }
  
    getItemQuantityInput(index) {
      return this.cartItems.eq(index).find('input[type="number"]'); 
    }
  
    getRemoveButton(index) {
      return this.cartItems.eq(index).find('.remove-button');
    }
  
    get subtotal() {
      return cy.get('.subtotal-amount'); 
    }
  
    get total() {
      return cy.get('.total-amount');
    }
  
    get checkoutButton() {
      return cy.get('#checkout-button'); 
    }
  
    get emptyCartMessage() {
      return cy.get('.empty-cart'); 
    }
  

    getItemCount() {
      return this.cartItems.its('length');
    }
  
    getItemNameText(index) {
      return this.getItemName(index).invoke('text');
    }
  
    getItemPriceText(index) {
      return this.getItemPrice(index).invoke('text');
    }
  
    setItemQuantity(index, quantity) {
      this.getItemQuantityInput(index).clear().type(quantity).blur();
    }
  
    clickRemoveButton(index) {
      this.getRemoveButton(index).click();
    }
  
    clickCheckoutButton() {
      this.checkoutButton.click();
    }
  
    verifySubtotalContains(expectedSubtotal) {
      this.subtotal.should('contain', expectedSubtotal);
    }
  
    verifyTotalContains(expectedTotal) {
      this.total.should('contain', expectedTotal);
    }
  
    verifyEmptyCartMessageIsVisible() {
      this.emptyCartMessage.should('be.visible');
    }
  
    visit() {
      cy.visit('/cart');
    }
  }
  
  export default CartPage;