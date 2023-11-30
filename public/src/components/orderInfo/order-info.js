import './order-info.scss';
import Link from '../link/link.js';
import template from './order-info.hbs';
import InfoRow from '../infoRow/info-row';

/**
 * Класс компонента информации о заказе
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
     * Взятие элемента компонента
     */
    get self() {
        return this.#parent.querySelector(`#${this.#config.id}`);
    }

    /**
     * Взятие элемента содержащего время заказа
     */
    get time() {
        return this.self.querySelector('.order-info__time-container');
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
