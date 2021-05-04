import { expect as chaiExpect} from 'chai';

import LoginPage from '../pageobjects/login.page';
import UserDetailsPage from '../pageobjects/userDetails.page';
import fixture from '../fixtures';

describe('Update User Details', () => {
    before(async () => {
        UserDetailsPage.open();
        await LoginPage.login();

        const settings = await $('.m-4 > span');
        await expect(settings).toBeExisting();
        await settings.click();

    });

    beforeEach(async () => {
        const accountSettings = await $('.ml-11:nth-child(2) .menu-option');
        await expect(accountSettings).toBeExisting();
        await accountSettings.click();

        const editButton =  await $('.mt-11:nth-child(2) .anchor div');
        await expect(editButton).toBeExisting();
        await editButton.click();
    });

    after( async () => {
        await LoginPage.logout();

        const logoutButton = await $('[data-original-title="Logout"]');
        await expect(logoutButton).toBeExisting();
        await logoutButton.click();
        await expect(await LoginPage.emailInput).toBeExisting();

        const newPageUrl = await browser.getUrl();
        chaiExpect(newPageUrl).to.equal('https://dev.deel.wtf/login');
    });
    
    it('should update Date of birth', async () => {
        const birthDateInput = await UserDetailsPage.birthDateInput;
        await birthDateInput.click();
        await birthDateInput.setValue(fixture.newDateofBirth);

        await (await UserDetailsPage.submitButton).click();

        const dateOfBirthLabel = await $('[data-qa="date-of-birth"]');
        await expect(dateOfBirthLabel).toBeExisting();
        await expect(dateOfBirthLabel).toHaveTextContaining(fixture.dateOfBirthText)
    });
    
    it('should update I’m a citizen of', async () => {
        const citizenOfInput = await UserDetailsPage.citizenOfInput;
        await citizenOfInput.click();

        const country = await $('#react-select-2-option-'+fixture.countryOptionNumber);
        country.click();

        await (await UserDetailsPage.submitButton).click();

        const citizenOfLabel = await $('[data-qa="citizen-of"]');
        await expect(citizenOfLabel).toBeExisting();
        await expect(citizenOfLabel).toHaveTextContaining(fixture.citizenOf)
    });

    it('should update Phone number', async () => {
        const phoneInput = await UserDetailsPage.phoneInput;
        await phoneInput.setValue(fixture.phone);

        await (await UserDetailsPage.submitButton).click();

        const citizenOfLabel = await $('[data-qa="phone-number"]');
        await expect(citizenOfLabel).toBeExisting();
        await expect(citizenOfLabel).toHaveTextContaining(fixture.phone)
    });
});
