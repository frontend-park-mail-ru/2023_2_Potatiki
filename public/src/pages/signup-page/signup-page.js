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
          return false;
      }

      for (let i = 0; i < login.length; ++i) {
        if(!(login.codePointAt(i) >= 0x41 && login.codePointAt(i) <= 0x5A || 
          login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A || 
          login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39)) {
          return false;
        }
      }

      return true;
    }

    checkPassword(pass) {
      if(pass.length < 6) {
          return false;
      }

      let isHasUpperLetter = false;
      let isHasLowerLetter = false
      let isHasDigit = false

      for (let i = 0; i < pass.length; ++i) {
        if(login.codePointAt(i) >= 0x41 && login.codePointAt(i) <= 0x5A) {
          isHasUpperLetter = true;
        }

        if(login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A) {
          isHasLowerLetter = true;
        }

        if(login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39) {
          isHasDigit = true;
        }
      }

      if(isHasDigit && isHasLowerLetter && isHasUpperLetter) { 
        return true;
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
    }
}
