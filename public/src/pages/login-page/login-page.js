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
   * Обработка отправки формы авторизации
   * @param {Object} event Событие отправки формы
   */
    formListener(event) {
        event.preventDefault();
        const form = document.forms['login-form'];
        const login = form.elements.login.value.trim();
        const password = form.elements.password.value;
        form.elements.password.value = '';

        // validate
        const [statusCode, body] = Ajax.postRequest(
            'signin',
            {login, password},
        );
        switch (statusCode) {
        case 200:
            this.#router('main', true);
            break;
        case 401:
        // add from error (make visible)
        // this.renderError('password', message);
            break;
        case 500:
            renderServerError(body.error);
            break;
        default:
            console.log('undefined status code:', statusCode);
        }
    }


    // add removeListeners


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
