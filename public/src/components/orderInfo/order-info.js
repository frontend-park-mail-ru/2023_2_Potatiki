import Link from '../link/link.js';
import template from './order-info.hbs';
import './order-info.css';
import Button from '../button/button';
import InfoRow from '../infoRow/info-row';

/**
 * Класс компонента карточки товара
 */
export default class OrderInfo {
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

        const self = document.querySelector(`#${this.#config.id}`);

        const changeLink = new Link(
            self.querySelector('.order-info__top-container'),
            this.#config.changeLink,
        );
        changeLink.render();

        this.#config.infoRows.forEach((element) => {
            const infoRow = new InfoRow(
                self.querySelector('.order-info__bottom-container'),
                element,
            );
            infoRow.render();
        });
    }
}
