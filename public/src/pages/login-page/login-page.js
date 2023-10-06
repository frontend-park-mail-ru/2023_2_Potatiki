import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import {checkPassword, checkLogin} from '../../modules/validation.js';
import '../templates.js';

/**
 * Класс страницы авторизации
 */
export default class LoginPage {
    #parent;

    #config;

    #router;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   * @param {Function} router Функция осуществляющая переход на другую страницу
   */
    constructor(parent, config, router) {
        this.#parent = parent;
        this.#config = config;
        this.#router = router;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.querySelector('#login-page');
    }

    /**
   * Обработка отправки формы авторизации
   * @param {Event} event Событие отправки формы
   */
    formListener(event) {
        event.preventDefault();
        const form = document.forms['login-form'];
        const login = form.elements.login.value.trim();
        const password = form.elements.password.value;
        form.elements.password.value = '';

        const [, isValidLogin] = checkLogin(login);

        const [, isValidPassword] = checkPassword(password);

        if (!(isValidLogin && isValidPassword)) {
            this.renderLoginError('Неверный логин или пароль');
            return;
        }


        Ajax.prototype.postRequest(
            this.#config.requests.login,
            {login, password},
        ).then((result) => {
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                this.#router('main', true);
                break;
            case 400:
                this.renderLoginError('Неверный логин или пароль');
                break;
            case 429:
                renderServerError(body.error);
                break;
            default:
                break;
            }
        });
    }

    /**
     * Удаление ошибки с формы авторизации
     * @param {Element} error
     * @param {Object} event
     */
    removeError(error, event) {
        event.preventDefault();
        error.textContent = '';
    }

    /**
     * Отрисовка ошибки формы
     * @param {String} errorText Текст ошибки
     */
    renderLoginError(errorText) {
        const error = document.querySelector('#login-form-error');
        error.textContent = errorText;
        const login = document.querySelector('[name=login]');
        login.addEventListener('focusin', this.removeError.bind(this, error), {once: true});
        const password = document.querySelector('[name=password]');
        password.addEventListener('focusin', this.removeError.bind(this, error), {once: true});
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        const id = this.#config.loginPage.form.submit.id;
        const button = document.querySelector(`#${id}`);
        button.removeEventListener('click', this.formListener);

        const loginInput = document.querySelector('[name=login]');
        loginInput.removeEventListener('focusin', this.removeError);

        const passwordInput = document.querySelector('[name=password]');
        passwordInput.removeEventListener('focusin', this.removeError);
    }

    /**
   * Отрисовка страницы авторизации
   */
    render() {
        this.#parent.innerHTML = window.Handlebars.templates['login-page.hbs']();

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        const loginForm = new LoginForm(
            this.self,
            this.#config.loginPage.form,
            this.formListener.bind(this),
        );

        loginForm.render();
    }
}
