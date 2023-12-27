const {test, expect} = require("@playwright/test");
const Sections = require("../pages/fixtures");
const data = require("../testData/text.json");
require("dotenv").config();

test("validating the Client Center page", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiClentCenter = new Sections.ClientCenter(page, test);
    await expect(CotivitiClentCenter.clientCenterButton).toBeVisible();
    await expect(CotivitiClentCenter.clientCenterButton).toHaveText("Client Center");
    await expect(CotivitiClentCenter.clientCenterButton).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(CotivitiClentCenter.clientCenterButton).toHaveCSS("display", "inline-block");
    await CotivitiClentCenter.clientCenterButton.click();
    await expect(CotivitiClentCenter.clientCenterText).toBeVisible();
    await expect(CotivitiClentCenter.clientCenterText).toHaveText("Client Center");
    await expect(CotivitiClentCenter.clientCenterText).toHaveCSS("color", "rgb(49, 0, 111)");
    await expect(CotivitiClentCenter.clientCenterDownText).toBeVisible();
    await expect(CotivitiClentCenter.clientCenterDownText).toHaveText("Access your Cotiviti solutions");
    await expect(CotivitiClentCenter.clientCenterDownText).toHaveCSS("color", "rgb(236, 0, 140)");

    let temp = 1;
    for (let index = 0; index < data.clientCenterCardsText.length; index++) {
        temp = index + 1;
        await expect(CotivitiClentCenter.clientCenterCards(temp)).toBeVisible();
        await expect(CotivitiClentCenter.clientCenterCards(temp)).toHaveText(data.clientCenterCardsText[index]);
    }

    await expect(CotivitiClentCenter.clientSupportHeadingText).toBeVisible();
    await expect(CotivitiClentCenter.clientSupportHeadingText).toHaveText("Contact our client support team");
    await expect(CotivitiClentCenter.clientSupportDescription).toBeVisible();
    await expect(CotivitiClentCenter.clientSupportDescription).toHaveText("Looking for immediate assistance with your Cotiviti solutions? Contact our enterprise help desk by phone or email, and we’ll ensure that your questions are answered.");
    await expect(CotivitiClentCenter.clientSupportContactInfoEmail).toBeVisible();
    await expect(CotivitiClentCenter.clientSupportContactInfoEmail).toHaveText("clientsupport@cotiviti.com");
    await expect(CotivitiClentCenter.cotivitiFooterLogo).toBeVisible();
    await expect(CotivitiClentCenter.cotivitiFooterLogo).toHaveCSS("display", "block");
});

test("validating the CotivitiConnect card, it's functionality and the login page of the CotivitiConnect page", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiClentCenter = new Sections.ClientCenter(page, test);
    await expect(CotivitiClentCenter.clientCenterButton).toBeVisible();
    await CotivitiClentCenter.clientCenterButton.click();
    await expect(CotivitiClentCenter.clientCenterCards(1)).toBeVisible();
    await expect(CotivitiClentCenter.clientCenterCards(1)).toHaveText(data.clientCenterCardsText[0]);
    const newPage = await CotivitiClentCenter.cickOnCotivitiConnectLoginButton();
    const newPageURL = newPage.url();
    await newPage.bringToFront();
    expect(newPageURL).toMatch(process.env.cotivitiConnectURL);
    const cotivitiConnectPage = new Sections.ClientCenter(newPage, test);
    await expect(cotivitiConnectPage.connectButton).toBeVisible();
    const isClickable = await cotivitiConnectPage.connectButton.isEnabled();
    expect(isClickable).toBeTruthy();
    await cotivitiConnectPage.connectButton.click();
    await expect(cotivitiConnectPage.loginForm).toBeVisible();
    await expect(cotivitiConnectPage.userNameText).toBeVisible();
    await expect(cotivitiConnectPage.userNameText).toHaveText("Username");
    await expect(cotivitiConnectPage.passwordNameText).toBeVisible();
    await expect(cotivitiConnectPage.passwordNameText).toHaveText("Password");
    await expect(cotivitiConnectPage.userNameInputFiled).toBeVisible();
    await expect(cotivitiConnectPage.userPasswordInputField).toBeVisible();
    await expect(cotivitiConnectPage.rembemberText).toBeVisible();
    await expect(cotivitiConnectPage.checkBox).toBeVisible();
    await expect(cotivitiConnectPage.signInButton).toBeVisible();
});

test('Entering the Empty Data and validating the error message of the login form', async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiClentCenter = new Sections.ClientCenter(page, test);
    await expect(CotivitiClentCenter.clientCenterButton).toBeVisible();
    await CotivitiClentCenter.clientCenterButton.click();
    const newPage = await CotivitiClentCenter.cickOnCotivitiConnectLoginButton();
    await newPage.bringToFront();
    const cotivitiConnectPage = new Sections.ClientCenter(newPage, test);
    await cotivitiConnectPage.connectButton.click();
    await expect(cotivitiConnectPage.loginForm).toBeVisible();
    await expect(cotivitiConnectPage.userNameText).toBeVisible();
    await expect(cotivitiConnectPage.passwordNameText).toBeVisible();
    await expect(cotivitiConnectPage.userNameInputFiled).toBeVisible();
    await cotivitiConnectPage.userNameInputFiled.fill("")
    await expect(cotivitiConnectPage.userPasswordInputField).toBeVisible();
    await cotivitiConnectPage.userPasswordInputField.fill("");
    await expect(cotivitiConnectPage.rembemberText).toBeVisible();
    await expect(cotivitiConnectPage.checkBox).toBeVisible();
    await cotivitiConnectPage.checkBox.click();
    await expect(cotivitiConnectPage.signInButton).toBeVisible();
    await cotivitiConnectPage.signInButton.click();
    await newPage.waitForTimeout(+ process.env.medium_time_wait);
    await expect(cotivitiConnectPage.alertMsgBox).toBeVisible();
    await expect(cotivitiConnectPage.userNameErrorMsg).toBeVisible();
    await expect(cotivitiConnectPage.userNameErrorMsg).toHaveText("Username is a required field.");
    await expect(cotivitiConnectPage.passwordErrorMsg).toBeVisible();
    await expect(cotivitiConnectPage.passwordErrorMsg).toHaveText("Password is a required field.");

});

test('verifying the invalid Login with incorrect cridentials', async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiClentCenter = new Sections.ClientCenter(page, test);
    await expect(CotivitiClentCenter.clientCenterButton).toBeVisible();
    await CotivitiClentCenter.clientCenterButton.click();
    const newPage = await CotivitiClentCenter.cickOnCotivitiConnectLoginButton();
    await newPage.bringToFront();
    const cotivitiConnectPage = new Sections.ClientCenter(newPage, test);
    await cotivitiConnectPage.connectButton.click();
    await expect(cotivitiConnectPage.loginForm).toBeVisible();
    await expect(cotivitiConnectPage.userNameInputFiled).toBeVisible();
    await cotivitiConnectPage.userNameInputFiled.fill("demoUser@gmail.com")
    await expect(cotivitiConnectPage.userPasswordInputField).toBeVisible();
    await cotivitiConnectPage.userPasswordInputField.fill("IncorrectPassword");
    await expect(cotivitiConnectPage.signInButton).toBeVisible();
    await cotivitiConnectPage.signInButton.click();
    await newPage.waitForTimeout(+ process.env.medium_time_wait);
    await expect(cotivitiConnectPage.invalidSignMsg).toBeVisible();
    await expect(cotivitiConnectPage.invalidSignMsg).toHaveText("Invalid sign-in attempt.");
});

test('Verifying the Forgot Password button functionality', async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiClentCenter = new Sections.ClientCenter(page, test);
    await expect(CotivitiClentCenter.clientCenterButton).toBeVisible();
    await CotivitiClentCenter.clientCenterButton.click();
    const newPage = await CotivitiClentCenter.cickOnCotivitiConnectLoginButton();
    await newPage.bringToFront();
    const cotivitiforgotPasswordPage = new Sections.ClientCenter(newPage, test);
    await cotivitiforgotPasswordPage.connectButton.click();
    await cotivitiforgotPasswordPage.forgotPasswordButton.click();
    await newPage.waitForTimeout(+process.env.medium_time_wait);
    const newUrl = await newPage.url();
    expect(newUrl).toMatch(process.env.cotivitiConnectForgotPasswordURL);
    await expect(cotivitiforgotPasswordPage.forgotPasswordText).toBeVisible()
    await expect(cotivitiforgotPasswordPage.forgotPasswordText).toHaveText("Forgot your password?");
    await cotivitiforgotPasswordPage.forgotPasswordEmailInput.fill("demoUser@cotiviti.com")
    await cotivitiforgotPasswordPage.sendButton.click()
    await newPage.waitForTimeout(+ process.env.medium_time_wait);
    await expect(cotivitiforgotPasswordPage.emailSentMsg).toBeVisible();
    await expect(cotivitiforgotPasswordPage.emailSentMsg).toHaveText("Please check your email to reset your password.");
});



