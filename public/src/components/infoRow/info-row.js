import Link from '../link/link.js';
import template from './info-row.hbs';
import './info-row.css';
import Button from '../button/button';

/**
 * Класс компонента строчки карточки информации
 */
export default class InfoRow {
    #parent;

    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const self = this.#parent.querySelector(`#${this.#config.id}`);

        const img = new Link(
            self.querySelector('.info-row__name-container'),
            this.#config.img,
            true,
        );
        img.render();
    }
}
