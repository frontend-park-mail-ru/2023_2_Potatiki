import Link from '../link/link.js';
import template from './count-management.hbs';
import './count-management.css';
import Button from '../button/button';

/**
 * Класс компонента карточки товара
 */
export default class CountManagement {
    #parent;

    #config;

    #isAfterBegin;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    get count() {
        return this.self?.querySelector('.count-managment__count-value');
    }

    get left() {
        return this.self?.querySelector(`#${this.#config.minus.id}`);
    }

    get right() {
        return this.self?.querySelector(`#${this.#config.plus.id}`);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );
        // console.log(this.#config.id);
        // const self = document.querySelector(`#${this.#config.id}`);

        const minus = new Button(
            this.self,
            this.#config.minus,
            true,
        );
        minus.render();

        const plus = new Button(
            this.self,
            this.#config.plus,
        );
        plus.render();
    }
}
