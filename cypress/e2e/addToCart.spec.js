import ProductSearchPage from '../pageObjects/ProductSearchPage';
import CartPage from '../pageObjects/CartPage';

const productSearchPage = new ProductSearchPage();
const cartPage = new CartPage();

describe('Add Products to Cart', { retries: 1 }, () => {
  beforeEach(() => {
    productSearchPage.visit();
  });

  it('Should allow adding multiple products to the cart and display all in the contents', () => {
    cy.fixture('products').then((productsData) => {
      const productsToAdd = productsData.productsToAdd;

      productsToAdd.forEach((product, index) => {
        productSearchPage.setSearchStrategy('name');
        productSearchPage.searchByName(product.name);
        productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
        productSearchPage.getAddToCartButton(0).click();

        if (index < productsToAdd.length - 1) {
          productSearchPage.visit();
        }
      });

      cartPage.visit();
      cartPage.getItemCount().should('eq', productsToAdd.length);

      productsToAdd.forEach((product, index) => {
        cartPage.getItemNameText(index).should('contain', product.name);
       
      });
    });
  });

});