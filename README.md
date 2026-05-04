# IT23556034 Playwright Assignment

## Description
This project contains automated Playwright tests to evaluate the accuracy of the Pixelssuite Sinhala transliteration system.

Test cases are executed using data from an Excel file, and the system compares the actual output with the expected output.

## Tested Website
https://pixelssuite.com/chat-translator

## Tools Used
- Playwright
- JavaScript

## How to Run Tests
Run the following command:
npx playwright test

## View Test Report
npx playwright show-report

## Test Results
- 50 test cases executed
- Includes negative test cases (failure scenarios)
- Some test cases fail as expected to validate system behavior

## Project Structure
- e2e/ – test scripts
- playwright.config.js – configuration file
- package.json – dependencies
- IT23556034.xlsx – test case data (input, expected, actual, status)

## Screenshots
Screenshots of test execution and results are included in the project.

## Notes
- Test results (Actual Output and Status) are automatically updated in the Excel file.
- This project demonstrates data-driven testing using Playwright.
