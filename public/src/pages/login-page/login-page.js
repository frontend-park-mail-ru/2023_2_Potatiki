import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import { loginURL } from '../../../config.js';
import {checkPassword, checkLogin} from '../../modules/validation.js';
import template from './login-page.hbs';

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
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
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

    /**
   * Отрисовка страницы авторизации
   */
    render() {
        this.#parent.innerHTML = template();

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        this.loginForm = new LoginForm(
            this.self,
            this.#config.loginPage.form,
        );

        this.loginForm.render();
    }
}
