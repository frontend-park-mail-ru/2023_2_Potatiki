import Link from '../../components/link/link.js';
import './not-found-page.css';
import template from './not-found-page.hbs';

/**
 * Класс страницы 404
 */
export default class NotFoundPage {
    #parent;

    #config;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.querySelector('#page-not-found');
    }

    /**
   * Отрисовка страницы авторизации
   */
    render() {
        this.#parent.innerHTML = template();

        const logo = new Link(this.self, this.#config.loginPage.logo, true);
        logo.render();
    }
}
