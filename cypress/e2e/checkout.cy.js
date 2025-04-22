import CartPage from '../pageObjects/CartPage';
import CheckoutPage from '../pageObjects/CheckoutPage';
import ProductSearchPage from '../pageObjects/ProductSearchPage'; 

const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const productSearchPage = new ProductSearchPage();

describe('Checkout Process', { retries: 1 }, () => {
  beforeEach(() => {
    
    productSearchPage.visit();
    productSearchPage.setSearchStrategy('name');
    productSearchPage.searchByName('Producto de prueba');
    productSearchPage.getSearchResultsCount().should('be.greaterThan', 0);
    productSearchPage.getAddToCartButton(0).click();
    cartPage.visit();
    cartPage.getItemCount().should('be.greaterThan', 0);
    cartPage.clickCheckoutButton();
  });

  it('Should allow completing checkout with valid shipping and payment information', () => {
    cy.fixture('checkoutData').then((checkoutData) => {
      const shippingInfo = checkoutData.validShippingInfo;
      const paymentInfo = checkoutData.validPaymentInfo;

      checkoutPage.typeFirstName(shippingInfo.firstName);
      checkoutPage.typeLastName(shippingInfo.lastName);
      checkoutPage.typeAddress(shippingInfo.address);
      checkoutPage.typeCity(shippingInfo.city);
      checkoutPage.selectState(shippingInfo.state);
      checkoutPage.typeZipCode(shippingInfo.zipCode);

      checkoutPage.selectPaymentMethod(paymentInfo.method);
      checkoutPage.typeCardNumber(paymentInfo.cardNumber);
      checkoutPage.typeExpiryDate(paymentInfo.expiryDate);
      checkoutPage.typeCvv(paymentInfo.cvv);

      checkoutPage.clickPlaceOrderButton();

      checkoutPage.verifySuccessMessageIsVisible();
      cy.url().should('include', '/order-confirmation');
      cy.contains('Pedido realizado con éxito').should('be.visible'); 
    });
  });

});