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

    login;

    password;

    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent, redirectUrl) {
        this.#parent = parent;
        this.#config = config.loginPage.form;
        this.#redirectUrl = redirectUrl;
    }

    /**
     *
     */
    get self() {
        return document.querySelector('#login-form');
    }

    /**
     *
     * @param {Evnt} event
     */
    submitHandle(event) {
        event.preventDefault();
        console.log('login handle');
        UserActions.login(this.login.self.value, this.password.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    /**
     *
     * @param {String} errorText
     */
    renderError(errorText) {
        const error = document.querySelector('#login-form-error');
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
