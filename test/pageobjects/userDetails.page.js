import Page from './page';

class UserDetailsPage extends Page {
    get birthDateInput() {
        return $('[name="birthDate"]');
    }

    get citizenOfInput() {
        return $('[name="citizen-of"]');
    }

    get phoneInput() {
        return $('[name="phone"]');
    }

    get submitButton() {
        return $('[data-qa="done"]');
    }
    
    open() {
      super.open('/');
    }
}
  
export default new UserDetailsPage();
