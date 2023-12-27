const {test, expect} = require("@playwright/test");
const Sections = require("../pages/fixtures");
const data = require("../testData/text.json");
require("dotenv").config();

test("validating the medical record card in  Client Center page", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiMedicalRecord = new Sections.MedicalRecordCardValue(page,test);
    await expect(CotivitiMedicalRecord.clientCenterButton).toBeVisible();
    await expect(CotivitiMedicalRecord.clientCenterButton).toHaveText("Client Center");
    await expect(CotivitiMedicalRecord.clientCenterButton).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(CotivitiMedicalRecord.clientCenterButton).toHaveCSS("display", "inline-block");
    await CotivitiMedicalRecord.clientCenterButton.click();
    await page.waitForTimeout(5000);
    await expect(CotivitiMedicalRecord.loginForMedicalRecord).toHaveCSS("background-color","rgb(149, 121, 211)");
    await expect(CotivitiMedicalRecord.loginForMedicalRecord).toHaveText("Log in now");
    await page.waitForTimeout(+process.env.Large_wait);
    const newPage = await CotivitiMedicalRecord.cickOnCotivitiMedicalRecord();
    const newPageURL = newPage.url();
    await newPage.bringToFront();
    expect(newPageURL).toMatch(process.env.cotivitiMedicalRecord);
    const cotivitiMedicalLoginPage = new Sections.MedicalRecordCardValue(newPage, test);
    await expect(cotivitiMedicalLoginPage.loginWithUsername).toBeVisible();
    await expect(cotivitiMedicalLoginPage.loginText).toHaveText("Login ID")
    await expect(cotivitiMedicalLoginPage.loginWithPassword).toBeVisible();
    await expect(cotivitiMedicalLoginPage.passwordText).toHaveText("Password")
    await cotivitiMedicalLoginPage.loginWithCredentials();
    await expect(cotivitiMedicalLoginPage.GoBtnForSubmit).toBeVisible();
    await expect(cotivitiMedicalLoginPage.GoBtnForSubmit).toHaveCSS("display", "block")
    await cotivitiMedicalLoginPage.GoBtnForSubmit.click();
    await page.waitForTimeout(3000);
    await expect(cotivitiMedicalLoginPage.labelForMessage).toBeVisible();
    await expect(cotivitiMedicalLoginPage.labelForMessage).toHaveCSS("color","rgb(255, 0, 0)")
});