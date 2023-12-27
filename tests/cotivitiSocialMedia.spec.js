const {test, expect} = require("@playwright/test");
const Sections = require("../pages/fixtures");
const data = require("../testData/text.json");
require("dotenv").config();

test("Verifying the Social media accounts of COTIVITI", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiHomePage = new Sections.SocialMediaAccounts(page, test);
    await page.waitForTimeout(+process.env.medium_time_wait);

    for (let index = 1; index < 7; index++) {
        await expect(CotivitiHomePage.knowledgeBankCards(index)).toBeVisible();
        await CotivitiHomePage.knowledgeBankCards(index).hover();
        await page.waitForTimeout(+ process.env.Small_time_width);
        await CotivitiHomePage.knowledgeBankCards(index).click();
        await page.waitForTimeout(+ process.env.Small_time_width);
        await CotivitiHomePage.cotivitiLogo.click();
        await page.waitForTimeout(+ process.env.Small_time_width);
    }

    await expect(CotivitiHomePage.cotivitiYoutubeIcon).toBeVisible();
    const youtubePage = await CotivitiHomePage.clickOnYoutubeIcon();
    const recivedYoutubeURL = youtubePage.url();
    await youtubePage.bringToFront();
    expect(recivedYoutubeURL).toMatch(process.env.cotivitiYoutubeURL);
    await page.waitForTimeout(+ process.env.Small_time_width);
    await page.bringToFront();
    await expect(CotivitiHomePage.cotivitiLinkedinIcon).toBeVisible();
    const linkedinPage = await CotivitiHomePage.clickOnLinkedinIcon();
    const recivedLinkedinURL = linkedinPage.url();
    expect(recivedLinkedinURL).toMatch(process.env.cotivitiLinkedinURL);
    await linkedinPage.waitForTimeout(+ process.env.Small_time_width);
    await page.bringToFront();
    await expect(CotivitiHomePage.cotivitiFaceBookIcon).toBeVisible();
    const faceBookPage = await CotivitiHomePage.clickOnFaceBookinIcon();
    await faceBookPage.bringToFront();
    const recivedFaceBookinURL = faceBookPage.url();
    expect(recivedFaceBookinURL).toMatch(process.env.cotivitiFacebookURL);
    await faceBookPage.waitForTimeout(+ process.env.Small_time_width);
    await page.bringToFront();
    await expect(CotivitiHomePage.cotivitiBlogsIcon).toBeVisible();
    const blogsPage = await CotivitiHomePage.clickOnBlogsIcon();
    await blogsPage.bringToFront();
    const recivedBlogsinURL = blogsPage.url();
    expect(recivedBlogsinURL).toMatch(process.env.cotivitiBlogsURL);
    await blogsPage.waitForTimeout(+ process.env.Small_time_width);
    await page.bringToFront();
});
