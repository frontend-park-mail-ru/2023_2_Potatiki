import template from './iframe.hbs';
import './iframe.scss';

/**
 * Класс компонента iframe
 */
export default class IFrame {
    #parent;
    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки
     */
    constructor() {
        this.#parent = document.querySelector('body');
        this.#config = {};
    }

    /**
     * Закрытие компонента
     */
    remove() {

    }

    /**
     * Отрисовка компонента
     */
    render() {
        console.log(template(this.#config), this.#parent);
        this.#parent.insertAdjacentHTML('beforeend', template(this.#config));
    }
}
