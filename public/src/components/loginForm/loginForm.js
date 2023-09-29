import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';


export default class LoginForm {
    #parent;
    #config

    constructor(parent) {
        this.#parent = parent;
        //this.#config = config;
        this.#config = {
            formName: 'login',

            login: {
                inputClass: 'input login-form__input',
                inputName: 'login',
                inputPlaceholder: 'Введите логин'
            },

            password: {
                inputClass: 'input login-form__input',
                inputName: 'password',
                inputPlaceholder: 'Введите пароль'
            },

            submit: {
                class: 'button login-form__button',
                type: 'button',
                id: 'login-submit-button',
                text: 'Войти',
            }, 

            signup: {
                id: 'signup-link',
                aClass: 'link login-form__link',
                aText: 'Зарегистрироваться',
                aHref: 'signup',
                withText: true,
            }
        }
    }

    render(submitHandle) {
        console.log("form-data", this.#config)
        this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['loginForm.hbs'](this.#config));

        const self = document.getElementById("login-form");

        const login = new Input(self, this.#config.login);
        login.render();

        const password = new Input(self, this.#config.password);
        password.render();

        const submit = new Button(self, this.#config.submit);
        submit.render();

        const signupLink = new Link(self, this.#config.signup);
        signupLink.render();
    }
}
