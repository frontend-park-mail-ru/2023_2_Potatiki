import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import '../templates.js';

/**
 *
 */
export default class SignupPage {
    #parent;

    #config;

    /**
   *
   * @param {*} parent
   * @param {*} config
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
   *
   */
    get self() {
        return document.getElementById('signup-page');
    }

    /**
   *
   * @param {*} e
   */
    formListener(e) {
        e.preventDefault();
        const form = document.forms['signup-form'];
        const login = form.elements.login.value.trim();
        const name = form.elements.name.value.trim();
        const password = form.elements.password.value;
        const repeatPassword = form.elements['repeat-password'].value;
    }

    checkLogin(login) {
      if(login.length < 6) {
          return 'Минимальная длина 6 символов';
      }

      for (let i = 0; i < login.length; ++i) {
        if(!(login.codePointAt(i) >= 0x41 && login.codePointAt(i) <= 0x5A || 
          login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A || 
          login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39)) {
          return 'Разрешена только латиница и цифры';
        }
      }

      return '';
    }

    checkPassword(pass) {
      if(pass.length < 8) {
          return 'Минимальная длина 8 символов';
      }

      let isHasUpperLetter = false;
      let isHasLowerLetter = false
      let isHasDigit = false

      for (let i = 0; i < pass.length; ++i) {
        if(pass.codePointAt(i) >= 0x41 && pass.codePointAt(i) <= 0x5A) {
          isHasUpperLetter = true;
        } else if(pass.codePointAt(i) >= 0x61 && pass.codePointAt(i) <= 0x7A) {
          isHasLowerLetter = true;
        } else if(pass.codePointAt(i) >= 0x30 && pass.codePointAt(i) <= 0x39) {
          isHasDigit = true;
        } else {
          return 'Разрешена только латиница и цифры';
        }
      }

      if(isHasDigit && isHasLowerLetter && isHasUpperLetter) { 
        return '';
      }

      return 'Должны быть заглавные, прописные буквы латиницы и цифры';
    }

    checkEqualityPassword(pass) {
      return function(reapeatPass) {
        if(pass.value !== reapeatPass) {
          return 'Пароли не совпадают';
        }
        return '';
      }
    }

    // add removeListeners

    /**
   *
   */
    render() {
        this.#parent.innerHTML = '';

        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['signup-page.hbs'](),
        );

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        const signupForm = new SignupForm(
            this.self,
            this.#config.signupPage.form,
            this.formListener.bind(this),
        );

        signupForm.render();

        signupForm.login.addFocusOutListener(this.checkLogin);
        signupForm.login.addFocusInListener();

        signupForm.password.addFocusOutListener(this.checkPassword);
        signupForm.password.addFocusInListener();

        console.log(signupForm.password.value);
        signupForm.reapeatPassword.addFocusOutListener(this.checkEqualityPassword(signupForm.password));
        signupForm.reapeatPassword.addFocusInListener();
    }
}
