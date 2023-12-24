import './count-management.scss';
import template from './count-management.hbs';
import Button from '../button/button';

/**
 * Класс компонента подсчета количества товара
 */
export default class CountManagement {
    #parent;
    #config;
    #isAfterBegin;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
     */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
     * Взятие количества товара
     */
    get count() {
        return this.self?.querySelector('.count-managment__count-value');
    }

    /**
     * Взятие элемента кнопки уменьшения количества товара
     */
    get left() {
        return this.self?.querySelector(`#${this.#config.minus.id}`);
    }

    /**
     * Взятие элемента кнопки увелечения количества товара
     */
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
