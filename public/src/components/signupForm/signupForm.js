import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';


export default class SignupForm {
    #parent;
    #config

    constructor(parent) {
        this.#parent = parent;
        //this.#config = config;
        this.#config = {
            formName: 'signup-form',

            login: {
                inputClass: 'input signup-form__input',
                inputName: 'login',
                inputPlaceholder: 'Придумайте логин'
            },

            password: {
                inputClass: 'input signup-form__input',
                inputName: 'password',
                inputPlaceholder: 'Придумайте пароль'
            },

            repeatPassword: {
                inputClass: 'input signup-form__input',
                inputName: 'repeat-password',
                inputPlaceholder: 'Повторите пароль'
            },

            submit: {
                class: 'button signup-form__button',
                type: 'button',
                id: 'signup-submit-button',
                text: 'Зарегистрироваться',
            }, 

            loginLink: {
                id: 'login-link',
                aClass: 'link signup-form__link',
                aText: 'Уже есть аккаунт?',
                aHref: 'login',
                withText: true,
            }
        }
    }

    render(submitHandle) {
        console.log("form-data", this.#config)
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
