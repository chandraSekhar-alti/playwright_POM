const {test, expect} = require("@playwright/test");
const Sections = require("../pages/fixtures");
const data = require("../testData/text.json");
require("dotenv").config();

test("validating the Payments accuracy tab and downloading the file", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiHomePage = new Sections.PaymentsPage(page, test);
    await CotivitiHomePage.paymentsCard.click();
    await expect(page).toHaveURL(/.*payment-accuracy/);
    await expect(CotivitiHomePage.paymentsAccuracyName).toBeVisible();
    await expect(CotivitiHomePage.paymentsAccuracyName).toHaveText("Payment Accuracy solutions");

    for (let i = 1; i < 4; i++) {
        await expect(CotivitiHomePage.paymentsAccuracySolution(i)).toBeVisible();
        await CotivitiHomePage.paymentsAccuracySolution(i).click();
        await page.waitForTimeout(+ process.env.Small_time_width);
    }

    await expect(CotivitiHomePage.downloadsolutionoverviewButton).toBeVisible();
    await CotivitiHomePage.downloadsolutionoverviewButton.click();
    await expect(CotivitiHomePage.formTitle).toBeVisible();
    await expect(CotivitiHomePage.formTitle).toHaveText("Download the Payment Accuracy brochure");

    for (let index = 0; index < data.formInputTitles.length; index++) {
        await expect(CotivitiHomePage.formSectionsTitle(data.formInputTitles[index])).toBeVisible();
    }

    await CotivitiHomePage.formInputsFirstName.fill(process.env.userFirstName);
    await CotivitiHomePage.formInputsLastName.fill(process.env.userLastName);
    await CotivitiHomePage.formInputsJobLevel.selectOption({value: "Vice President"});
    await CotivitiHomePage.formInputsEmail.fill(process.env.userWorkingEmail);
    await CotivitiHomePage.formInputsJobTitle.fill(process.env.userJobTitle);
    await CotivitiHomePage.formInputsDemo.selectOption({value: "true"});
    await CotivitiHomePage.formInputsCheckBox.click();
    await CotivitiHomePage.submitButton.click();
    await page.waitForTimeout(+ process.env.medium_time_wait);
    await expect(CotivitiHomePage.formSubmitMessage).toBeVisible();
    await expect(CotivitiHomePage.formSubmitMessage).toHaveText("Thanks for your interest in our Payment Accuracy Solutions brochure.");
    await CotivitiHomePage.formSubmitMessage.click();
    await page.waitForTimeout(+ process.env.medium_time_wait);
    const newPage = await CotivitiHomePage.clickViewBrochure();
    const newPageUrl = newPage.url();
    const expertedURL = /https:\/\/info\.cotiviti\.com\/hubfs\/assets\/cotiviti\/brochures\/Cotiviti-SolutionOverview-PaymentAccuracy\.pdf.*/;
    expect(newPageUrl).toMatch(expertedURL);
    await page.waitForTimeout(5000);
});

test("submitting form without giving any texts in the input fields and validating the error messages ", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiHomePage = new Sections.PaymentsPage(page, test);
    await CotivitiHomePage.paymentsCard.click();
    await expect(page).toHaveURL(/.*payment-accuracy/);
    await expect(CotivitiHomePage.paymentsAccuracyName).toBeVisible();
    await expect(CotivitiHomePage.paymentsAccuracyName).toHaveText("Payment Accuracy solutions");
    await expect(CotivitiHomePage.downloadsolutionoverviewButton).toBeVisible();
    await CotivitiHomePage.downloadsolutionoverviewButton.click();
    await expect(CotivitiHomePage.formTitle).toBeVisible();
    await expect(CotivitiHomePage.formTitle).toHaveText("Download the Payment Accuracy brochure");
    await CotivitiHomePage.submitButton.click();
    await page.waitForTimeout(+ process.env.medium_time_wait);
    await expect(CotivitiHomePage.firstNameErrorMsg).toBeVisible();
    await expect(CotivitiHomePage.firstNameErrorMsg).toHaveText("Please complete this required field.");
    await expect(CotivitiHomePage.lastNameErrorMsg).toBeVisible();
    await expect(CotivitiHomePage.lastNameErrorMsg).toHaveText("Please complete this required field.");
    await expect(CotivitiHomePage.workingEmailErrorMsg).toBeVisible();
    await expect(CotivitiHomePage.workingEmailErrorMsg).toHaveText("Please complete this required field.");
    await expect(CotivitiHomePage.jobLevelErrorMsg).toBeVisible();
    await expect(CotivitiHomePage.jobLevelErrorMsg).toHaveText("Please select an option from the dropdown menu.");
    await expect(CotivitiHomePage.jobTitleErrorMsg).toBeVisible();
    await expect(CotivitiHomePage.jobTitleErrorMsg).toHaveText("Please complete this required field.");
    await expect(CotivitiHomePage.blogErrorMsg).toBeVisible();
    await expect(CotivitiHomePage.blogErrorMsg).toHaveText("Please complete all required fields.");
});
