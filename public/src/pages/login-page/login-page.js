import './login-page.scss';
import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import template from './login-page.hbs';
import {config} from '../../../config.js';
import {UserActions} from '../../actions/user.js';
import {loginRoute} from '../../config/urls.js';

/**
 * Класс страницы авторизации
 */
export default class LoginPage {
    #parent;

    #config;

    #continueUrl;

    loginForm;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent, params) {
        this.#parent = parent;
        this.#config = config.loginPage;
        this.#continueUrl = params.continue;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.getElementById('login-page');
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.loginForm.removeListeners();
    }

    /**
     *
     */
    unsubscribeToEvents() {
        this.loginForm.unsubscribeToEvents();
    }

    /**
   * Отрисовка страницы авторизации
   */
    render() {
        document.getElementById('container-header').innerHTML = '';
        this.#parent.innerHTML = template();
        UserActions.getCSRFToken(loginRoute);

        const logo = new Link(this.self, this.#config.logo);
        logo.render();

        this.loginForm = new LoginForm(
            this.self,
            this.#continueUrl,
        );

        this.loginForm.render();
    }
}
