import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';

/**
 *
 */
export default class SignupForm {
    #parent;
    #config;
    #submitHandle;
    login;
    password;
    repeatPassword;
    submit;

    /**
     *
     * @param {*} parent
     * @param {*} config
     * @param {*} submitHandle
     */
    constructor(parent, config, submitHandle) {
        this.#parent = parent;
        this.#config = config;
        this.#submitHandle = submitHandle;
    }

    /**
   *
   */

    checkLogin(login) {
        if(login.length < 6) {
            return false;
        }
        return true;
    }

    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['signupForm.hbs'](this.#config),
        );

        const self = document.getElementById('signup-form');

        this.login = new Input(self, this.#config.login);
        this.login.render();

        // self.login.addEventListener("focusout", (event) => {
        //     if (!this.checkLogin(self.login.value)) {
        //         login.renderError('Error!');
        //     }
        // });

        // self.login.addEventListener("focusin", (event) => {
        //     login.removeError();
        // });

        this.password = new Input(self, this.#config.password);
        this.password.render();

        // self.password.addEventListener("focusout", (event) => {
        //     if (!this.checkPassword(self.password.value)) {
        //         login.renderError('Error!');
        //     }
        // });

        // this.password.addEventListener("focusin", (event) => {
        //     password.removeError();
        // });

        this.reapeatPassword = new Input(self, this.#config.repeatPassword);
        this.reapeatPassword.render();

        this.submit = new Button(self, this.#config.submit, this.#submitHandle);
        this.submit.render();

        const loginLink = new Link(self, this.#config.loginLink);
        loginLink.render();
    }
}
