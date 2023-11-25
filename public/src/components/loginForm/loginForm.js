import './loginForm.scss';
import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import template from './loginForm.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {config} from '../../../config.js';
import router from '../../modules/router.js';
import {Events} from '../../config/events.js';
import {mainRoute} from '../../config/urls.js';

/**
 * Класс формы авторизации
 */
export default class LoginForm {
    #parent;
    #config;
    #redirectUrl;

<<<<<<< HEAD
    login;
    password;
    submit;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский компонент
     * @param {String} redirectUrl Ссылка для редиректа
     */
=======
    #redirectUrl;

    login;

    password;

    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
>>>>>>> origin/main
    constructor(parent, redirectUrl) {
        this.#parent = parent;
        this.#config = config.loginPage.form;
        this.#redirectUrl = redirectUrl;
<<<<<<< HEAD
=======
    }

    /**
     *
     */
    get self() {
        return document.getElementById('login-form');
    }

    /**
     *
     * @param {Evnt} event
     */
    submitHandle(event) {
        event.preventDefault();
        UserActions.login(this.login.self.value, this.password.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderError(errorText) {
        const error = document.getElementById('login-form-error');
        error.textContent = errorText;
    }

    /**
     *
     */
    redirect() {
        if (this.#redirectUrl) {
            router.go({url: this.#redirectUrl});
            return;
        }
        router.go({url: mainRoute});
    }

    redirect = this.redirect.bind(this);

    /**
     *
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
    }

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.LOGIN_FORM_ERROR, this.renderError);
        eventEmmiter.subscribe(Events.SUCCESSFUL_LOGIN, this.redirect);
    }

    /**
     *
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.LOGIN_FORM_ERROR, this.renderError);
        eventEmmiter.unsubscribe(Events.SUCCESSFUL_LOGIN, this.redirect);
    }

    /**
     *
     */
    removeListeners() {
        this.submit.self.removeEventListener('click', this.submitHandle);
>>>>>>> origin/main
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.getElementById('login-form');
    }

    /**
     * Функция обработки отправки формы
     * @param {Evnt} event События нажатия отправки формы
     */
    submitHandle(event) {
        event.preventDefault();
        UserActions.login(this.login.self.value, this.password.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     * Отображение ошибки формы
     * @param {String} errorText Текст ошибки
     */
    renderError(errorText) {
        const error = document.getElementById('login-form-error');
        error.textContent = errorText;
    }

    /**
     * Перенаправление на предыдущую страницу
     */
    redirect() {
        if (this.#redirectUrl) {
            router.go({url: this.#redirectUrl});
            return;
        }
        router.go({url: mainRoute});
    }

    redirect = this.redirect.bind(this);

    /**
     * Добавление листенерова
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.LOGIN_FORM_ERROR, this.renderError);
        eventEmmiter.subscribe(Events.SUCCESSFUL_LOGIN, this.redirect);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.LOGIN_FORM_ERROR, this.renderError);
        eventEmmiter.unsubscribe(Events.SUCCESSFUL_LOGIN, this.redirect);
    }

    /**
     * Удаление листенеров
     */
    removeListeners() {
        this.submit.self.removeEventListener('click', this.submitHandle);
    }

    /**
     * Отрисовка компонента формы авторизации
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        this.login = new Input(
            document.querySelector('.login-form__login'),
            this.#config.login,
        );
        this.login.render();

        this.password = new Input(
            document.querySelector('.login-form__password'),
            this.#config.password,
        );
        this.password.render();

        this.submit = new Button(this.self, this.#config.submit);
        this.submit.render();

        const signupLink = new Link(this.self, this.#config.signup);
        signupLink.render();

        this.addListeners();
        this.subscribeToEvents();
    }
}
