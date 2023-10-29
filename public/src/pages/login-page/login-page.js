import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import template from './login-page.hbs';
import { config } from '../../../config.js';

/**
 * Класс страницы авторизации
 */
export default class LoginPage {
    #parent;

    #config;

    loginForm;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   * @param {Function} router Функция осуществляющая переход на другую страницу
   */
    constructor(parent) {
        this.#parent = parent;
        console.log( config.loginPage);
        this.#config = config.loginPage;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.querySelector('#login-page');
    }

    /**

     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.loginForm.removeListeners();
    }

    unsubscribeToEvents() {
        this.loginForm.unsubscribeToEvents();
    }

    /**
   * Отрисовка страницы авторизации
   */
    render() {
        this.#parent.innerHTML = template();

        const logo = new Link(this.self, this.#config.logo);
        logo.render();

        this.loginForm = new LoginForm(
            this.self
        );

        this.loginForm.render();
    }
}
