exports.PaymentsPage = class PaymentsPage {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.paymentsCard = page.locator('//div[@class="span2 widget-span widget-type-custom_widget "]');
        this.paymentsAccuracyName = page.locator('//h1[@class="heading fw-bold "]');
        this.paymentsAccuracySolution = (text) => page.locator(`(//ul[@class="pl"]/li)[${text}]`);
        this.downloadsolutionoverviewButton = page.locator('//a[text()="Download solution overview"]')
        this.formTitle = page.locator("//h3[text()='Download the Payment Accuracy brochure']");
        this.formSectionsTitle = (genericText) => page.locator(`//span[text()='${genericText}']`);
        this.formInputsFirstName = page.locator("//input[@name='firstname']");
        this.formInputsLastName = page.locator("//input[@name='lastname']");
        this.formInputsJobLevel = page.locator("//select[@name='job_level']");
        this.formInputsEmail = page.locator("//input[@name='email']");
        this.formInputsJobTitle = page.locator("//input[@name='jobtitle']");
        this.formInputsDemo = page.locator("//select[@name='are_you_interested_in_a_demo_']");
        this.formInputsCheckBox = page.locator("//input[@type='checkbox']");
        this.submitButton = page.locator("//input[@type='submit']");
        this.formSubmitMessage = page.locator("//p[text()='Thanks for your interest in our Payment Accuracy Solutions brochure.']")
        this.browcherButton = page.locator("//strong[text()='View the brochure']");
        this.firstNameErrorMsg = page.locator('(//form[@method="POST"]/descendant::ul/descendant::label)[1]');
        this.lastNameErrorMsg = page.locator('(//form[@method="POST"]/descendant::ul/descendant::label)[2]');
        this.workingEmailErrorMsg = page.locator('(//form[@method="POST"]/descendant::ul/descendant::label)[3]');
        this.jobLevelErrorMsg = page.locator('(//form[@method="POST"]/descendant::ul/descendant::label)[4]');
        this.jobTitleErrorMsg = page.locator('(//form[@method="POST"]/descendant::ul/descendant::label)[5]');
        this.blogErrorMsg = page.locator('(//form[@method="POST"]/descendant::ul/descendant::label)[7]');
    }

    async clickViewBrochure() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click("//strong[text()='View the brochure']"),
        ]);
        return newPage;
    }

}