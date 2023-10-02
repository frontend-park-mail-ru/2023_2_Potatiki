import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
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
     *
     * @param {*} login
     * @param {*} password
     * @returns
     */
    checkInput(login, password) {
        if (login.length < 6) {
            return false;
        }
        if (password.length < 8) {
            return false;
        }
        return true;
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

        if (!this.checkInput(login, password)) {
            this.renderLoginError('Неверный логин или пароль');
            console.log('err input');
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
            case 401:
                this.renderLoginError(body);
                break;
            case 500:
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
    removeError(event, error) {
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
        const input = document.getElementsByClassName('login-form__input')[0];
        input.addEventListener('focusin', this.removeError.bind(this, error));
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
