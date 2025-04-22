class ProductSearchPage {
    get searchInput() {
      return cy.get('#search-input');
    }
  
    get searchButton() {
      return cy.get('#search-button'); 
    }
  
    get searchResults() {
      return cy.get('.product-item');
    }
  
    getProductName(index) {
      return this.searchResults.eq(index).find('.product-name');
    }
  
    getProductPrice(index) {
      return this.searchResults.eq(index).find('.product-price');
    }
  
    getAddToCartButton(index) {
      return this.searchResults.eq(index).find('.add-to-cart');
    }
  
    get noResultsMessage() {
      return cy.get('.no-results');
    }
  
    get categoryDropdown() {
      return cy.get('#category-filter');
    }
  
    constructor() {
      this.currentSearchStrategy = 'name'; 
    }
  
    setSearchStrategy(strategyType) {
      this.currentSearchStrategy = strategyType;
    }
  
    search(termOrCategory) {
      switch (this.currentSearchStrategy) {
        case 'name':
          this.#searchByName(termOrCategory);
          break;
        case 'category':
          this.#searchByCategory(termOrCategory);
          break;
        default:
          cy.log(`Estrategia de búsqueda "${this.currentSearchStrategy}" no soportada.`);
          break;
      }
    }
  
    #searchByName(name) {
      this.searchInput.type(name);
      this.searchButton.click();
    }
  
    #searchByCategory(category) {
      this.categoryDropdown.select(category);
      this.searchButton.click();
    }
  
    getSearchResultsCount() {
      return this.searchResults().its('length');
    }
  
    getProductNameText(index) {
      return this.getProductName(index).invoke('text');
    }
  
    getProductPriceText(index) {
      return this.getProductPrice(index).invoke('text');
    }
  
    clickAddToCart(index) {
      this.getAddToCartButton(index).click();
    }
  
    verifyNoResultsMessageIsVisible() {
      this.noResultsMessage.should('be.visible');
    }
  
    visit() {
      cy.visit('/search');
    }
  
    searchByName(name) {
      this.visit();
      this.setSearchStrategy('name');
      this.search(name);
    }
  
    searchByCategory(category) {
      this.visit();
      this.setSearchStrategy('category');
      this.search(category);
    }
  }
  
  export default new ProductSearchPage();