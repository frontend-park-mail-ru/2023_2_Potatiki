import Button from '../button/button.js';
import template from './order-results.hbs';
import './order-results.css';

/**
 * Класс компонента итога заказа
 */
export default class OrderResults {
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

    get self() {
        return document.querySelector(`.order-results`);
    }

    get count() {
        console.log('count, self:', this.self);
        return this.self.querySelector('#products-count');
    }

    get subprice() {
        return this.self.querySelector('#subprice');
    }

    get result() {
        return this.self.querySelector('#result-price');
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const button = new Button(
            this.self,
            this.#config,
            true,
        );
        button.render();
    }
}
