import { expect as chaiExpect} from 'chai';

import LoginPage from '../pageobjects/login.page';
import UserDetailsPage from '../pageobjects/userDetails.page';
import fixture from '../fixtures';

describe('Update User Details', () => {
    beforeEach(async () => {
        UserDetailsPage.open();
        await LoginPage.login();

        const settings = await $('.m-4 > span');
        await expect(settings).toBeExisting();
        await settings.click();

        const accountSettings = await $('.ml-11:nth-child(2) .menu-option');
        await expect(accountSettings).toBeExisting();
        await accountSettings.click();

        const editButton =  await $('.mt-11:nth-child(2) .anchor div');
        await expect(editButton).toBeExisting();
        await editButton.click();
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
    
    // it('should update I’m a citizen of', async () => {
    // });

    // it('should update Phone number', async () => {
    // });
});
