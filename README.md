# E-commerce Application Test Automation Suite

This project contains an automated test suite for a fictional e-commerce web application, built using Cypress and JavaScript. The suite aims to cover key functionalities of the application to ensure its quality and reliability.

## Project Structure

The project follows a structured approach to maintainability and clarity:
```
CypressChallenge/
├── cypress/
│   ├── e2e/             # Contains the end-to-end test files (.cy.js)
│   ├── fixtures/        # Stores static test data in JSON format
│   └── pageObjects/     # Holds the Page Object Model classes
│       ├── CartPage.js
│       ├── CheckoutPage.js
│       ├── LoginPage.js
│       ├── ProductSearchPage.js
│       └── RegistrationPage.js
├── .github/
│   └── workflows/
│       └── cypress.yml      # GitHub Actions workflow for CI/CD
```

## Design Patterns

The following design patterns have been implemented to enhance the structure and maintainability of the test suite:

* **Page Object Model (POM):** Each key page of the e-commerce application (Registration, Login, Product Search, Cart, and Checkout) has a corresponding class within the `pageObjects` directory. These classes encapsulate the selectors for page elements and the methods to interact with them, providing an abstraction layer between the tests and the application's UI structure.

* **Strategy Pattern:** The `ProductSearchPage` utilizes the Strategy Pattern to manage different ways of searching for products (e.g., by name and by category). This allows for flexible and easily extensible search strategies within the test suite.

## Test Scenarios

The following key test scenarios have been automated:

* **User Registration:** Verifies the successful registration of a new user with valid details.
* **User Login:** Tests the login functionality with both valid and invalid user credentials.
* **Product Search:** Covers searching for products by name and by category, and verifying the displayed results, including handling cases with no search results.
* **Adding Products to Cart:** Tests the ability to add single and multiple products to the shopping cart and verifies the cart contents.
* **Checkout Process:** Automates the complete checkout process, including filling in shipping information and processing payment with valid details.

## Retry and Parallel Testing

* **Retry Pattern:** To handle occasional temporary failures, the tests are set up to automatically try running again if they fail the first time. This is configured in the `cypress.config.js` file.

* **Parallel Execution:** To make the tests run faster, they are set up to run at the same time using GitHub Actions and Cypress Cloud. This involves telling GitHub to run multiple instances of the test process.

## Best Practices Utilized

* **Clear and Descriptive Naming:** `describe` and `it` blocks in test files use clear and concise language to describe the functionality being tested and the expected outcomes.
* **Data Externalization:** Test data (e.g., user credentials, product information, checkout details) is stored in `.json` files within the `cypress/fixtures` directory, keeping the test logic separate from the data.
* **Comprehensive Logging:** `cy.log()` statements are strategically added within the test steps to provide detailed information about the actions being performed and the verifications being attempted, aiding in debugging and understanding the test flow.
* **Environment Variables:** Sensitive information like the Cypress Cloud record key is managed securely using GitHub Secrets and accessed as environment variables within the GitHub Actions workflow.

## Local Setup

To run the tests locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Cypress tests:**
    ```bash
    npx cypress open
    # or to run in headless mode:
    npx cypress run
    ```

## GitHub Actions Setup

The project includes a GitHub Actions workflow (`.github/workflows/cypress.yml`) for continuous integration and continuous delivery (CI/CD). **A key purpose of this setup is to leverage parallel test execution to reduce the overall testing time.**

**Running the Workflow:**

This workflow is set up to run automatically on every push to the `main` branch and on every pull request targeting the `main` branch. Additionally, you can **manually trigger** this workflow from the "Actions" tab in your GitHub repository.

**Steps for Manual Trigger (Workflow Dispatch):**

1.  Go to your repository on GitHub.
2.  Click on the "Actions" tab.
3.  In the left sidebar, under "Workflows", find the "Cypress Tests" workflow.
4.  Click on the workflow name.
5.  On the right side of the page, you should see a button labeled "Run workflow".
6.  Click this button to manually execute the test suite.

**Setup for Forked Repositories:**

If you have forked this repository and want to run the tests in your own GitHub Actions, follow these steps, which are also necessary to take advantage of parallel execution:

1.  **Enable GitHub Actions:** Ensure that GitHub Actions are enabled for your forked repository.
2.  **Configure Secrets:**
    * Go to your forked repository on GitHub.
    * Navigate to "Settings" -> "Secrets and variables" -> "Actions".
    * Add the following secret:
        * **Name:** `CYPRESS_RECORD_KEY`
        * **Value:** Your Cypress Cloud record key (found in your Cypress Cloud project settings). You will need to create a Cypress Cloud account and link your forked project to it to obtain a record key. **This key is essential for enabling parallel testing.**
3.  **Commit and Push:** Ensure the `.github/workflows/cypress.yml` file is present in your forked repository.

Once these steps are completed in your forked repository, the Cypress tests will run automatically on pushes and pull requests within your fork, and you can also trigger them manually. **By configuring the `CYPRESS_RECORD_KEY`, your tests will be able to execute in parallel using Cypress Cloud**, significantly speeding up the test runs. The results will be recorded in your Cypress Cloud dashboard for your forked project.