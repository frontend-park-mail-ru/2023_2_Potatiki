import './signupForm.scss';
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
 * Класс компонента формы авторизацияя
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

    /**
     * Функция обаботки отправки формы
     * @param {Event} event
     */
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
     * Функция вызова валидации для поля логина
     * @param {Event} event
     */
    inputLoginHandle(event) {
        event.preventDefault();
        UserActions.validateLogin(this.login.self.value);
    }

    inputLoginHandle = this.inputLoginHandle.bind(this);

    /**
     * Функция вызова валидации для поля пароля
     * @param {Event} event
     */
    inputPasswordHandle(event) {
        event.preventDefault();
        UserActions.validatePassword(this.password.self.value);
    }

    inputPasswordHandle = this.inputPasswordHandle.bind(this);

    /**
     * Функция вызова валидации для поля повторить пароль
     * @param {Event} event
     */
    inputRepeatPasswordHandle(event) {
        event.preventDefault();
        UserActions.validateRepeatPassword(this.password.self.value,
            this.repeatPassword.self.value);
    }

    inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    /**
     * Функция вызова валидации для поля НОМЕРА ТЕЛЕФОНА
     * @param {Event} event
     */
    inputPhoneHandle(event) {
        event.preventDefault();
        UserActions.validatePhone(this.phone.self.value);
    }

    inputPhoneHandle = this.inputPhoneHandle.bind(this);

    /**
     * Редирект на главную страницу
     */
    redirectOnMain() {
        router.go({url: mainRoute});
    }

    /**
     * Отрисовка ошибки поля логина
     * @param {String} errorText Текст ошибки
     */
    renderLoginError(errorText) {
        this.login.removeError();
        this.login.renderError(errorText);
    }

    renderLoginError = this.renderLoginError.bind(this);

    /**
     *  Отрисовка ошибки поля пароль
     * @param {String} errorText Текст ошибки
     */
    renderPasswordError(errorText) {
        this.password.removeError();
        this.password.renderError(errorText);
    }

    renderPasswordError = this.renderPasswordError.bind(this);

    /**
     * Отрисовка ошибки поля повторить пароль
     * @param {String} errorText Текст ошибки
     */
    renderRepeatPasswordError(errorText) {
        this.repeatPassword.removeError();
        this.repeatPassword.renderError(errorText);
    }

    renderRepeatPasswordError = this.renderRepeatPasswordError.bind(this);

    /**
     * Отрисовка ошибки поля номера телефона
     * @param {String} errorText Текст ошибки
     */
    renderPhoneError(errorText) {
        this.phone.removeError();
        this.phone.renderError(errorText);
    }

    renderPhoneError = this.renderPhoneError.bind(this);

    /**
     * Добавление листенеров
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.login.self.addEventListener('focusout', this.inputLoginHandle);
        this.password.self.addEventListener('focusout', this.inputPasswordHandle);
        this.repeatPassword.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
        this.phone.self.addEventListener('focusout', this.inputPhoneHandle);
        const el = this.phone.self;
        const pattern = el.getAttribute('placeholder');
        const slots = new Set('_');
        const prev = ((j) => Array.from(pattern, (c, i) => slots.has(c)? j=i+1: j))(0);
        const first = [...pattern].findIndex((c) => slots.has(c));
        const accept = new RegExp(el.dataset.accept || '\\d', 'g');
        const clean = (input) => {
            input = input.match(accept) || [];
            return Array.from(pattern, (c) =>
                input[0] === c || slots.has(c) ? input.shift() || c : c,
            );
        };
        const format = () => {
            const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
                i = clean(el.value.slice(0, i)).findIndex((c) => slots.has(c));
                return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
            });
            el.value = clean(el.value).join``;
            el.setSelectionRange(i, j);
            back = false;
        };
        let back = false;
        el.addEventListener('keydown', (e) => back = e.key === 'Backspace');
        el.addEventListener('input', format);
        el.addEventListener('focus', format);
        el.addEventListener('blur', () => el.value === pattern && (el.value=''));
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
     * Подписка на события
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
     * Отписк аот событий
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

        const self = document.getElementById('signup-form');

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
