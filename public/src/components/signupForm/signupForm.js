import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';


export default class SignupForm {
    #parent;
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render(submitHandle) {
        this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['signupForm.hbs'](this.#config));

        const self = document.getElementById("signup-form");

        const login = new Input(self, this.#config.login);
        login.render();

        const password = new Input(self, this.#config.password);
        password.render();

        const reapeatPassword = new Input(self, this.#config.repeatPassword);
        reapeatPassword.render();

        const submit = new Button(self, this.#config.submit);
        submit.render();

        const loginLink = new Link(self, this.#config.loginLink);
        loginLink.render();
    }
}
