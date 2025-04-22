import ProductSearchPage from '../pageObjects/ProductSearchPage';

const productSearchPage = new ProductSearchPage();

describe('Product Search', { retries: 1 }, () => {
  beforeEach(() => {
    productSearchPage.visit();
  });

  it('Should search for products by name and display matching results', () => {
    cy.fixture('searchProducts').then((searchData) => {
      const searchByNameData = searchData.searchByName;
      productSearchPage.setSearchStrategy('name');
      productSearchPage.searchByName(searchByNameData.searchTerm);


      productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
      productSearchPage.getProductNameText(0).should('contain', searchByNameData.expectedResult);
      
    });
  });

  it('Should display a "No results found" message if there are no matches', () => {
    cy.fixture('searchProducts').then((searchData) => {
      const noResultsData = searchData.noResultsSearch;
      productSearchPage.setSearchStrategy('name');
      productSearchPage.searchByName(noResultsData.searchTerm);

      productSearchPage.verifyNoResultsMessageIsVisible();
      productSearchPage.noResultsMessage.should('contain', noResultsData.noResultsMessage);
    });
  });

  it('Should search for products by category and display relevant results', () => {
    cy.fixture('searchProducts').then((searchData) => {
      const searchByCategoryData = searchData.searchByCategory;
      productSearchPage.setSearchStrategy('category'); 
      productSearchPage.search(searchByCategoryData.category);

      productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
      productSearchPage.getProductNameText(0).should('contain', searchByCategoryData.expectedResult);
 
    });
  });

});