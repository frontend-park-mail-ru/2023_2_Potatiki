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
        return document.getElementById('login-page');
    }

    /**
   * Обработка отправки формы авторизации
   * @param {Object} event Событие отправки формы
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
            'auth/signin',
            {login, password},
        ).then((result) => {
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                this.#router('main', true);
                break;
            case 400:
                this.renderLoginError('Неверный логин или пароль'); // на сервере на русском?
                break;
            case 429:
                renderServerError(body.error);
                break;
            default:
                break;
            }
        });
    }


    // add removeListeners

    /**
     *
     * @param {*} event
     * @param {*} error
     */
    removeError(error, event) {
        event.preventDefault();
        error.textContent = '';
    }

    /**
     *
     * @param {*} errorText
     */
    renderLoginError(errorText) {
        const error = document.getElementById('login-form-error');
        error.textContent = errorText;
        const login = document.getElementsByName('login')[0];
        login.addEventListener('focusin', this.removeError.bind(this, error), {once: true});
        const password = document.getElementsByName('password')[0];
        password.addEventListener('focusin', this.removeError.bind(this, error), {once: true});
        // const input = document.getElementsByClassName('login-form__input')[0];
    }

    /**
     *
     */
    removeListeners() {
        const id = this.#config.loginPage.form.submit.id;
        const button = document.getElementById(id);
        button.removeEventListener('click', this.formListener);

        const loginInput = document.getElementsByName('login')[0];
        loginInput.removeEventListener('focusin', this.removeError);

        const passwordInput = document.getElementsByName('password')[0];
        passwordInput.removeEventListener('focusin', this.removeError);
    }

    /**
   * Отрисовки страницы авторизации
   */
    render() {
        this.#parent.innerHTML = '';

        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['login-page.hbs'](),
        );

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
