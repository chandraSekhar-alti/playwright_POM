exports.ClientCenter = class ClientCenter {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.clientCenterButton = page.locator("(//li/a[text()='Client Center'])[1]");
        this.clientCenterText = page.locator('//div[@class="span6 span-responsive"]/h1');
        this.clientCenterDownText = page.locator('//div[@class="span6 span-responsive"]/p');
        this.clientCenterCards = (genericNumber) => page.locator(`(//div[@class="card  "])[${genericNumber}]/descendant::h5`)
        this.clientSupportHeadingText = page.locator('//h6[@class="mb2"]');
        this.clientSupportDescription = page.locator('(//h6[@class="mb2"]/parent::span/p)[1]');
        this.clientSupportContactInfo = page.locator('(//h6[@class="mb2"]/parent::span/p)[2]');
        this.clientSupportContactInfoEmail = page.locator('(//h6[@class="mb2"]/parent::span/p)[2]/a');
        this.cotivitiFooterLogo = page.locator('//a[@id="footer-logo"]');
        this.clientCenterCardsLoginButton = (genericText) => page.locator(`(//div[@class="card-footer"]/a[text()='Log in now'])[${genericText}]`)
        this.connectButton = page.locator("//button[text()='Connect']/parent::a");
        this.loginForm = page.locator('//form[@method="post"]');
        this.userNameText = page.locator('//label[@for="Username"]/span/span');
        this.passwordNameText = page.locator('//label[@for="PasswordValue"]/span/span');
        this.userNameInputFiled = page.locator('//input[@id="Username"]');
        this.userPasswordInputField = page.locator('//input[@id="PasswordValue"]');
        this.rembemberText = page.locator('//div[@class="checkbox"]/label/span/span');
        this.checkBox = page.locator('//input[@id="RememberMe"]');
        this.signInButton = page.locator('//button[@title="Sign in"]');
        this.alertMsgBox = page.locator('//div[@id="loginValidationSummary"]');
        this.userNameErrorMsg = page.locator("//a[text()='Username is a required field.']");
        this.passwordErrorMsg = page.locator("//a[text()='Password is a required field.']");
        this.invalidSignMsg = page.locator("//a[text()='Invalid sign-in attempt. ']");
        this.forgotPasswordButton = page.locator("//a[text()='Forgot your password?']");
        this.forgotPasswordText = page.locator("//span[text()='Forgot your password?']");
        this.forgotPasswordEmailInput = page.locator('//input[@id="Email"]');
        this.sendButton = page.locator('//button[@id="submit-forgot-password"]');
        this.emailSentMsg = page.locator("//div[text()='Please check your email to reset your password.']")
    }

    async cickOnCotivitiConnectLoginButton() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click('(//div[@class="card-footer"]/a[text()="Log in now"])[1]'),
        ]);
        return newPage;
    }

}
