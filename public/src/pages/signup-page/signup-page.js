import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import {checkLogin, checkPassword} from '../../modules/validation.js';
import { signupURL } from '../../../config.js';
import template from './signup-page.hbs';

/**
 * Класс страницы регистрации
 */
export default class SignupPage {
    #parent;

    #config;

    signupForm;
    

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
        return document.querySelector('#signup-page');
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.signupForm.removeListeners();
    }

    /**
   * Отрисовка страницы
   */
    render() {
        this.#parent.innerHTML = template();

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        this.signupForm = new SignupForm(
            this.self,
            this.#config.signupPage.form,
        );

        this.signupForm.render();
    }
}
