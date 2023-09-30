import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';

/**
 *
 */
export default class LoginForm {
    #parent;

    #config;

    #submitHandle;

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
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['loginForm.hbs'](this.#config),
        );

        const self = document.getElementById('login-form');

        const login = new Input(self, this.#config.login);
        login.render();

        const password = new Input(self, this.#config.password);
        password.render();

        const submit = new Button(self, this.#config.submit, this.#submitHandle);
        submit.render();

        const signupLink = new Link(self, this.#config.signup);
        signupLink.render();
    }
}
