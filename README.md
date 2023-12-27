Project Overview
This project leverages the Playwright framework in a Page Object Model (POM) architecture to automate the testing of the Cotiviti web application. The structure is designed for clarity, maintainability, and efficient reporting.

Folder Structure
allure-reports: Contains detailed Allure reports, providing insights into test results.
allure-results: Stores raw data for Allure report generation.
node_modules: Holds Node.js modules required for the project.
pages: Houses files defining page objects for the Cotiviti web application.
playwright-report: Stores Playwright-generated reports, offering a comprehensive view of test runs.
testdata: Includes data files, such as text.json in JSON format, crucial for testing scenarios.
test-results: Reserved for additional test result data or custom reports.
tests: Central directory for the implementation of test scripts targeting the Cotiviti web application.
.env: Configuration file (dotenv) for managing environment variables.
Getting Started
Install Dependencies:

bash commands for quick run :- 
        * npm install
    Run Tests:
        * "npm run test" -- for running the test cases
        * "npm run reportsGenerate" -- for generating the reports
        * "npm run reportsOpen" -- to open the allure reports.

Test Reporting
Allure Reports: Access detailed reports in the allure-reports folder for a comprehensive view of test outcomes.
Playwright Reports: Explore Playwright-generated reports in the playwright-report directory for insights into test runs.
Contribution Guidelines
Feel free to contribute to the project by following our guidelines outlined in the CONTRIBUTING.md file.

License
This project is licensed under the MIT License.

Acknowledgments
Special thanks to the Playwright community for their valuable contributions and support