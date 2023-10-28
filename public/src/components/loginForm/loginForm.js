import Button from '../button/button.js';
import Input from '../input/input.js';
import Link from '../link/link.js';
import template from './loginForm.hbs';
import { UserActions } from '../../actions/user.js';
import { eventEmmiter } from '../../modules/event-emmiter.js';

/**
 * Класс формы авторизации
 */
export default class LoginForm {
    #parent;

    #config;

    login;

    password;

    submit;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки класса
   * @param {Function} submitHandle Функция, вызываемая при отправке формы
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    get self() {
        return document.querySelector('#login-form');
    }

    submitHandle(event) {
        event.preventDefault();
        console.log('login handle');
        UserActions.login(this.login.self.value, this.password.self.value);
    }

    submitHandle = this.submitHandle.bind(this);

    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
    }

    subscribeToEvents() {
        eventEmmiter.subscribe('error-input', this.login.renderError);
        eventEmmiter.subscribe('error-input', this.password.renderError);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe('error-input', this.login.renderError);
        eventEmmiter.unsubscribe('error-input', this.password.renderError);
    }

    removeListeners() {
        console.log('remove login lis');
        this.submit.self.removeEventListener('click', this.submitHandle);

        // const loginInput = document.querySelector('[name=login]');
        // loginInput.removeEventListener('focusin', this.removeError);

        // const passwordInput = document.querySelector('[name=password]');
        // passwordInput.removeEventListener('focusin', this.removeError);
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
        //this.subscribeToEvents();
    }
}
