import ProductSearchPage from '../pageObjects/ProductSearchPage';
import CartPage from '../pageObjects/CartPage';

const productSearchPage = new ProductSearchPage();
const cartPage = new CartPage();

describe('Add Products to Cart', { retries: 1 }, () => {
  beforeEach(() => {
    cy.log('Visiting the Product Search page...');
    productSearchPage.visit();
  });

  it('Should allow adding multiple products to the cart and display all in the contents', () => {
    cy.fixture('products').then((productsData) => {
      const productsToAdd = productsData.productsToAdd;

      cy.log(`Attempting to add ${productsToAdd.length} products to the cart.`);
      productsToAdd.forEach((product, index) => {
        cy.log(`--- Adding, Searching and Verifying product ${index + 1}: ${product.name} ---`);
        productSearchPage.setSearchStrategy('name');
        productSearchPage.searchByName(product.name);
        productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
        productSearchPage.getAddToCartButton(0).click();
        cy.log(`"${product.name}" should now be added to the cart.`);

        if (index < productsToAdd.length - 1) {
          cy.log('Navigating back to the Product Search page to add the next product.');
          productSearchPage.visit();
        }
      });

      cy.log('--- Navigating to the Cart page to verify contents ---');
      cartPage.visit();
      cartPage.getItemCount().should('eq', productsToAdd.length);
      cy.log(`Cart has ${productsToAdd.length} items.`);

      productsToAdd.forEach((product, index) => {
        cy.log(`Verifying item ${index + 1} should be: ${product.name}`);
        cartPage.getItemNameText(index).should('contain', product.name);
      });
    });
  });

});