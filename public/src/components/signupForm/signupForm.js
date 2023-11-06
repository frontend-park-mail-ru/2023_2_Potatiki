import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import template from './signupForm.hbs';
import {UserActions} from '../../actions/user.js';
import {config} from '../../../config.js';
import router from '../../modules/router.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {mainRoute} from '../../config/urls.js';

/**
 *
 */
export default class SignupForm {
    #parent;
    #config;
    login;
    password;
    repeatPassword;
    submit;
    phone;

    /**
     * Конструктор
     * @param {Element} parent Родительский элемент
     */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.signupPage.form;
    }

    submitHandle = (event) => {
        event.preventDefault();
        UserActions.signup(
            this.login.self.value,
            this.password.self.value,
            this.repeatPassword.self.value,
            this.phone.self.value,
        );
    };

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputLoginHandle(event) {
        event.preventDefault();
        UserActions.validateLogin(this.login.self.value);
    }

    inputLoginHandle = this.inputLoginHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputPasswordHandle(event) {
        event.preventDefault();
        UserActions.validatePassword(this.password.self.value);
    }

    inputPasswordHandle = this.inputPasswordHandle.bind(this);

    /**
     *
     * @param {Event} event
     */
    inputRepeatPasswordHandle(event) {
        event.preventDefault();
        UserActions.validateRepeatPassword(this.password.self.value,
            this.repeatPassword.self.value);
    }

    inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    /**
     *
     * @param {*} event
     */
    inputPhoneHandle(event) {
        event.preventDefault();
        UserActions.validatePhone(this.phone.self.value);
    }

    inputPhoneHandle = this.inputPhoneHandle.bind(this);

    /**
     *
     */
    redirectOnMain() {
        router.go({url: mainRoute});
    }

    // /**
    //  *
    //  * @param {String} errorText
    //  */
    // renderError(errorText) {
    //     const error = document.querySelector('#signup-form-error');
    //     error.textContent = errorText;
    // }

    /**
     *
     * @param {String} errorText
     */
    renderLoginError(errorText) {
        this.login.removeError();
        this.login.renderError(errorText);
    }

    renderLoginError = this.renderLoginError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderPasswordError(errorText) {
        this.password.removeError();
        this.password.renderError(errorText);
    }

    renderPasswordError = this.renderPasswordError.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderRepeatPasswordError(errorText) {
        this.repeatPassword.removeError();
        this.repeatPassword.renderError(errorText);
    }

    renderRepeatPasswordError = this.renderRepeatPasswordError.bind(this);

    renderPhoneError(errorText) {
        this.phone.removeError();
        this.phone.renderError(errorText);
    }

    renderPhoneError = this.renderPhoneError.bind(this);

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.login.self.addEventListener('focusout', this.inputLoginHandle);
        this.password.self.addEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
        this.phone.self.addEventListener('focusout', this.inputPhoneHandle);
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.submit.self.removeEventListener('click', this.submitHandle);
        this.login.self.removeEventListener('focusout', this.inputLoginHandle);
        this.password.self.removeEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.removeEventListener('focusout', this.inputRepeatPasswordHandle);
        this.phone.self.removeEventListener('focusout', this.inputPhoneHandle);
    }

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.SIGNUP_FORM_ERROR, this.renderError);
        eventEmmiter.subscribe(Events.SUCCESSFUL_SIGNUP, this.redirectOnMain);
        eventEmmiter.subscribe(Events.LOGIN_INPUT_ERROR, this.renderLoginError);
        eventEmmiter.subscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.subscribe(Events.REPEAT_PASSWORD_INPUT_ERROR, this.renderRepeatPasswordError);
        eventEmmiter.subscribe(Events.PHONE_INPUT_ERROR, this.renderPhoneError);
    }

    /**
     *
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.SIGNUP_FORM_ERROR, this.renderError);
        eventEmmiter.unsubscribe(Events.SUCCESSFUL_SIGNUP, this.redirectOnMain);
        eventEmmiter.unsubscribe(Events.LOGIN_INPUT_ERROR, this.renderLoginError);
        eventEmmiter.unsubscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.unsubscribe(Events.REPEAT_PASSWORD_INPUT_ERROR,
            this.renderRepeatPasswordError);
        eventEmmiter.unsubscribe(Events.PHONE_INPUT_ERROR, this.renderPhoneError);
    }

    /**
     * Отрисовка ошибки в форме
     * @param {String} error Текст ошибки
     */
    renderError(error) {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        errorDiv.textContent = error;
    }

    renderError = this.renderError.bind(this);

    /**
     * Удаление ошибки с формы
     */
    removeError() {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        errorDiv.textContent = '';
    }

    removeError = this.removeError.bind(this);

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

        this.phone = new Input(
            document.querySelector('.signup-form__phone'),
            this.#config.phone,
        );
        this.phone.render();

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
        this.subscribeToEvents();
    }
}
