import {config} from '../../../config.js';
import Link from '../../components/link/link.js';
import './not-found-page.scss';
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
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.loginPage;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.getElementById('page-not-found');
    }

    /**
   * Отрисовка страницы 404
   */
    render() {
        this.#parent.innerHTML = template();

        const logo = new Link(this.self, this.#config.logo, true);
        logo.render();
    }
}
