import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import '../templates.js';

/**
 * Класс формы регистрации
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
       // this.#submitHandle = submitHandle;
       this.#submitHandle = () => {console.log('Immma SUBMIT')};
    }


    /**
     * Валидация логина
     * @param {String} login Логин пользователя
     * @return {Boolean} Результат проверки
     */
    checkLogin(login) {
        if (login.length < 6) {
            return false;
        }
        return true;
    }

    /**
     * Отрисовка компонента формы регистрации
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['signupForm.hbs'](this.#config),
        );

        const self = document.getElementById('signup-form');

        this.login = new Input(self, this.#config.login);
        this.login.render();

        this.password = new Input(self, this.#config.password);
        this.password.render();


        this.reapeatPassword = new Input(self, this.#config.repeatPassword);
        this.reapeatPassword.render();

        this.submit = new Button(self, this.#config.submit, this.#submitHandle);
        this.submit.render();

        const loginLink = new Link(self, this.#config.loginLink);
        loginLink.render();
    }
}
