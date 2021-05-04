import Page from './page';

class LoginPage extends Page {
    get emailInput() {
      return $('[name="email"]');
    }
    get passwordInput() {
        return $('[name="password"]');
      }
    get logInBtn() {
      return $('button.mt-10');
    }
    get pageHeader(){
        return $('h1.mb-9')
    }

    async login() {
        await (await this.emailInput).setValue(global.userEmail);
        await (await this.passwordInput).setValue(global.userPassword);
        await (await this.logInBtn).click();
    }

    async logout() {
        const logoutButton = await $('[data-original-title="Logout"]');
        await expect(logoutButton).toBeExisting();
        await logoutButton.click();
    }
  
    open() {
      super.open('/');
    }
}
  
export default new LoginPage();
