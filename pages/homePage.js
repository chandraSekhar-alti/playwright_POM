exports.HomePage = class HomePage {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.headerTextLink = (genericText) => page.locator(`(//a[text()='${genericText}'])[1]`);
        this.headerDropDownItems = (genericText) => page.locator(`(//ul[@class="active-branch"]/li/ul[@role='menu']/li[@role='none']/a[text()='${genericText}'])[1]`);
        this.subHeading = (genericLink) => page.locator(`(//ul[@role="menu"]/li/a[text()='${genericLink}'])[1]`);
        this.backToTopButton = page.locator('//button[@id="cotiviti-back-to-top"]');
    }
}
