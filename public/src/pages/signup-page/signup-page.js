import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import template from './signup-page.hbs';
import {config} from '../../../config.js';

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
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.signupPage;
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
     *
     */
    unsubscribeToEvents() {
        this.signupForm.unsubscribeToEvents();
    }

    /**
   * Отрисовка страницы
   */
    render() {
        this.#parent.innerHTML = template();

        const logo = new Link(this.self, this.#config.logo);
        logo.render();

        this.signupForm = new SignupForm(
            this.self,
        );

        this.signupForm.render();
    }
}
