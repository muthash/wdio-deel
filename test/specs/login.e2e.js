import LoginPage from '../pageobjects/login.page';
import fixture from '../fixtures';
import { expect as chaiExpect} from 'chai';

describe('Login into the application', () => {
    beforeEach(() => {
        LoginPage.open();
    });
    
    it('should not allow login with invalid email', async () => {
        await expect(browser).toHaveTitle(fixture.loginPageTitle);
        await (await LoginPage.emailInput).setValue(fixture.invalidEmail);
        await (await LoginPage.passwordInput).setValue("getUserPassword");
        await (await LoginPage.logInBtn).click();

        const errorfield = await $('.input-container-error');
        await expect(errorfield).toHaveText('Invalid email address');
    });
    
    it('should login with valid credentials and logout', async () => {
        await expect(browser).toHaveTitle(fixture.loginPageTitle);
        await LoginPage.login();
        
        const button = await $('.m-4');
        await expect(button).toBeExisting();
        await expect(button).toHaveTextContaining('Settings');
        
        const pageUrl = await browser.getUrl();
        chaiExpect(pageUrl).to.not.equal('https://dev.deel.wtf/login');
        chaiExpect(pageUrl).to.equal('https://dev.deel.wtf/');

        await LoginPage.logout();

        const logoutButton = await $('[data-original-title="Logout"]');
        await expect(logoutButton).toBeExisting();
        await logoutButton.click();
        await expect(await LoginPage.emailInput).toBeExisting();

        const newPageUrl = await browser.getUrl();
        chaiExpect(newPageUrl).to.equal('https://dev.deel.wtf/login');
    });
});
