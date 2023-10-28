import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import template from './signupForm.hbs';
import { UserActions } from '../../actions/user.js';

/**
 * Класс формы регистрации
 */
export default class SignupForm {
    #parent;
    #config;
    login;
    password;
    repeatPassword;
    submit;

    /**
     * Конструктор
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки
     * @param {Function} submitHandle Функция вызываемая при отправке формы
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    submitHandle = (event) => {
        event.preventDefault();
        UserActions.login(this.login.self.value, this.password.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    inputLoginHandle(event) {
        event.preventDefault();
        console.log('login out');
        UserActions.validateLogin(this.login.self.value);
    }

    inputLoginHandle = this.inputLoginHandle.bind(this);

    inputPasswordHandle(event) {
        event.preventDefault();
        UserActions.validatePassword(this.password.self.value);
    }

    inputPasswordHandle = this.inputPasswordHandle.bind(this);

    inputRepeatPasswordHandle(event) {
        event.preventDefault();
        UserActions.validateRepeatPassword(this.password.self.value, this.reapeatPassword.self.value);
    }

    inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.login.self.addEventListener('focusout', this.inputLoginHandle);
        this.password.self.addEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
    }

     /**
     * Удаление прослушивателей событий
     */
     removeListeners() {
        this.submit.self.removeEventListener('click', this.submitHandle);
        this.login.self.removeEventListener('focusout', this.inputLoginHandle);
        this.password.self.removeEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.removeEventListener('focusout', this.inputRepeatPasswordHandle);
    }


    subscribeToEvents() {

    }

    unsubscribeToEvents() {
        
    }

    /**
     * Отрисовка ошибки в форме
     * @param {String} error Текст ошибки
     */
    renderError(error) {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        errorDiv.textContent = error;
    }

    /**
     * Удаление ошибки с формы
     */
    removeError() {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        errorDiv.textContent = '';
    }


    /**
     * Отрисовка компонента формы регистрации
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const self = document.querySelector('#signup-form');

        this.login = new Input(
            document.querySelector('.signup-form__login'),
            this.#config.login,
        );
        this.login.render();

        this.password = new Input(
            document.querySelector('.signup-form__password'),
            this.#config.password,
        );
        this.password.render();


        this.repeatPassword = new Input(
            document.querySelector('.signup-form__repeat-password'),
            this.#config.repeatPassword,
        );
        this.repeatPassword.render();

        this.submit = new Button(self, this.#config.submit);
        this.submit.render();

        const loginLink = new Link(self, this.#config.loginLink);
        loginLink.render();

        this.addListeners();
    }
}
