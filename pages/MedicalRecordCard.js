exports.MedicalRecordCardValue=class MedicalRecordCardValue{

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.clientCenterButton = page.locator("(//li/a[text()='Client Center'])[1]");
        this.loginForMedicalRecord=page.locator("(//a[text()='Log in now'])[2]");
        this.loginWithUsername=page.locator("//input[@name='USERNAME']");
        this.loginWithPassword=page.locator("//input[@name='PASSWORD']");
        this.GoBtnForSubmit=page.locator('//a[@class="go"]');
        this.labelForMessage=page.locator("//label[@id='lblLoginMessage']");
        this.loginText=page.locator("//label[text()='Login ID']");
        this.passwordText=page.locator("//label[text()='Password']")
        
    }

    async cickOnCotivitiMedicalRecord() {
        const [newPage] = await Promise.all([
            new Promise((resolve) => this.page.once("popup", resolve)),
            this.page.click("(//a[text()='Log in now'])[2]"),
        ]);
        return newPage;
    }
    async loginWithCredentials(){
        await this.loginWithUsername.click();
        await this.loginWithUsername.fill("demologin@gmal.com")
        await this.loginWithPassword.click();
        await this.loginWithPassword.fill("demo@123"); 
   
    }
}