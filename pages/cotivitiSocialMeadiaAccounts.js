exports.SocialMediaAccounts = class SocialMediaAccounts {
    constructor(page, test) {
        this.test = test;
        this.page = page;
        this.cotivitiLogo = page.locator(`(//a[@href="https://www.cotiviti.com/"])[1]`);
        this.knowledgeBankCards = (genricLink) => page.locator(`//div[@data-type="collection"]/ul/li[${genricLink}]`);
        this.cotivitiYoutubeIcon = page.locator('//a[@title="YouTube"]');
        this.cotivitiLinkedinIcon = page.locator('//a[@title="LinkedIn"]')
        this.cotivitiFaceBookIcon = page.locator('//a[@title="Facebook"]');
        this.cotivitiBlogsIcon = page.locator('//a[@title="Cotiviti Blog"]');
    }

    async clickOnYoutubeIcon() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click('//a[@title="YouTube"]'),
        ]);
        return newPage;
    }

    async clickOnLinkedinIcon() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click('//a[@title="LinkedIn"]'),
        ]);
        return newPage;
    }

    async clickOnFaceBookinIcon() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click('//a[@title="Facebook"]'),
        ]);
        return newPage;
    }

    async clickOnBlogsIcon() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click('//a[@title="Cotiviti Blog"]'),
        ]);
        return newPage;
    }

}
