const {test, expect} = require("@playwright/test");
const Sections = require("../pages/fixtures");
const data = require("../testData/text.json");
require("dotenv").config();

test("Validating the Cotiviti Headers bar Dropdown and validating the Hover functionality", async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiHomePage = new Sections.HomePage(page, test);
    await CotivitiHomePage.headerTextLink("Markets").click();

    // Iterate through CotivitiHeaders
    for (const category of data.CotivitiHeaders) {
        for (const key in category) {
            if (category.hasOwnProperty(key)) {
                await expect(CotivitiHomePage.headerTextLink(key)).toBeVisible();
                await CotivitiHomePage.headerTextLink(key).hover();

                if (Array.isArray(category[key])) { // Iterate through items in arrays
                    for (const item of category[key]) {
                        await expect(CotivitiHomePage.headerDropDownItems(item.text)).toBeVisible();
                        await CotivitiHomePage.headerDropDownItems(item.text).hover();
                        await page.waitForTimeout(+ process.env.Small_time_width);
                    }
                } else if (typeof category[key] === "object") {
                    for (const solutionCategory in category[key]) {
                        for (const solution of category[key][solutionCategory]) {
                            await page.waitForTimeout(1000);
                            await expect(CotivitiHomePage.headerTextLink(key)).toBeVisible();
                            await CotivitiHomePage.headerTextLink(key).hover();

                            await CotivitiHomePage.subHeading(solution).hover();
                        }
                    }
                }
            }
        }
    }
});

test('Verifying the up-arrow functionality button in home page', async ({page}) => {
    await page.goto(process.env.COtiviti_URL);
    const CotivitiHomePage = new Sections.HomePage(page, test);
    await expect(CotivitiHomePage.backToTopButton).toBeVisible();
    await CotivitiHomePage.backToTopButton.click();
    await expect(CotivitiHomePage.backToTopButton).toHaveCSS("background-color", "rgb(49, 0, 111)")
    await expect(CotivitiHomePage.backToTopButton).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(CotivitiHomePage.backToTopButton).toHaveAttribute("type", "button");
    await expect(CotivitiHomePage.backToTopButton).toHaveClass("cotiviti-back-to-top cotiviti-button cotiviti-invisible");
    await expect(CotivitiHomePage.backToTopButton).toHaveAttribute("aria-label", "Scroll to Top");

});
