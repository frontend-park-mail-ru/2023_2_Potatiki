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
        this.#submitHandle = submitHandle;
        // this.#submitHandle = () => {console.log('Immma SUBMIT')};
    }

    renderError(error) {
        const errorDiv = document.getElementById(this.#config.errorId);
        // errorDiv.insertAdjacentHTML('beforeend', error);
        console.log(errorDiv);
        errorDiv.textContent = error;
        console.log('error', error);
    }

    removeError() {
        console.log('remove', this.#config.errorId);
        const errorDiv = document.getElementById(this.#config.errorId);
        console.log(errorDiv);
        errorDiv.textContent = '';
        console.log('no error');
    }

    removeListeners() {
        this.login.removeListeners();
        this.password.removeListeners();
        this.reapeatPassword.removeListeners();
        this.submit.removeListeners();
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

        this.login = new Input(document.getElementsByClassName('signup-form__login')[0], this.#config.login);
        this.login.render();

        this.password = new Input(document.getElementsByClassName('signup-form__password')[0], this.#config.password);
        this.password.render();


        this.reapeatPassword = new Input(document.getElementsByClassName('signup-form__repeat-password')[0], this.#config.repeatPassword);
        this.reapeatPassword.render();

        this.submit = new Button(self, this.#config.submit, this.#submitHandle);
        this.submit.render();

        const loginLink = new Link(self, this.#config.loginLink);
        loginLink.render();
    }
}
