import LoginPage from '../pageobjects/login.page';
import fixture from '../fixtures';
import { expect as chaiExpect} from 'chai';

describe('Login into the application', () => {
    beforeEach(() => {
        LoginPage.open();
    });

    after(async () => {
        LoginPage.logout();

        const pageUrl = await browser.getUrl();
        chaiExpect(pageUrl).to.equal('https://dev.deel.wtf/login/');
    });
    
    it('should not allow login with invalid email', async () => {
        await expect(browser).toHaveTitle(fixture.loginPageTitle);
        await (await LoginPage.emailInput).setValue(fixture.invalidEmail);
        await (await LoginPage.passwordInput).setValue("getUserPassword");
        await (await LoginPage.logInBtn).click();

        const errorfield = await $('.input-container-error');
        await expect(errorfield).toHaveText('Invalid email address');
    });
    
    it('should login with valid credentials', async () => {
        await expect(browser).toHaveTitle(fixture.loginPageTitle);
        await LoginPage.login();
        const button = await $('.m-4');

        await expect(button).toBeExisting();
        await expect(button).toHaveTextContaining('Settings');
        
        const pageUrl = await browser.getUrl();
        chaiExpect(pageUrl).to.not.equal('https://dev.deel.wtf/login/');
        chaiExpect(pageUrl).to.equal('https://dev.deel.wtf/');
    });
});
