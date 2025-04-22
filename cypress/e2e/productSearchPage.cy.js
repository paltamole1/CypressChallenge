import ProductSearchPage from '../pageObjects/ProductSearchPage';

const productSearchPage = new ProductSearchPage();

describe('Product Search', { retries: 1 }, () => {
  beforeEach(() => {
    cy.log('--- Visiting the Product Search page ---');
    productSearchPage.visit();
  });

  it('Should search for products by name and display matching results', () => {
    cy.fixture('searchProduct').then((searchData) => {
      const searchByNameData = searchData.searchByName;
      cy.log('--- Searching for product by name ---');
      cy.log(`Search Term: ${searchByNameData.searchTerm}`);
      productSearchPage.setSearchStrategy('name');
      productSearchPage.searchByName(searchByNameData.searchTerm);

      cy.log('--- Search initiated. Verifying results... ---');
      productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
      productSearchPage.getProductNameText(0).should('contain', searchByNameData.expectedResult);
      
    });
  });

  it('Should display a "No results found" message if there are no matches', () => {
    cy.fixture('searchProduct').then((searchData) => {
      const noResultsData = searchData.noResultsSearch;
      cy.log('--- Searching for a product with no matches ---');
      cy.log(`Search Term: ${noResultsData.searchTerm}`);
      productSearchPage.setSearchStrategy('name');
      productSearchPage.searchByName(noResultsData.searchTerm);

      cy.log('--- Search initiated. Verifying no results message... ---');
      productSearchPage.verifyNoResultsMessageIsVisible();
      productSearchPage.noResultsMessage.should('contain', noResultsData.noResultsMessage);
    });
  });

  it('Should search for products by category and display relevant results', () => {
    cy.fixture('searchProduct').then((searchData) => {
      const searchByCategoryData = searchData.searchByCategory;
      cy.log('--- Searching for products by category ---');
      cy.log(`Category: ${searchByCategoryData.category}`);
      productSearchPage.setSearchStrategy('category'); 
      productSearchPage.search(searchByCategoryData.category);

      cy.log('--- Category search initiated. Verifying results... ---');
      productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
      productSearchPage.getProductNameText(0).should('contain', searchByCategoryData.expectedResult);
 
    });
  });

});