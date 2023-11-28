import './review.scss';
import template from './review.hbs';
import StarsRow from '../starsRow/stars-row';

/**
 * Класс компонента отзыва
 */
export default class Review {
    #parent;

    #config;

    #isAfterBegin;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     * Получение элемента из DOM
     */
    get self() {
        return document.getElementById(this.id);
    }

    /**
     * Геттер для id
     */
    get id() {
        return this.#config.id;
    }

    /**
   * Отрисовка компонента
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(
                this.#config,
            ),
        );

        const starsRow = new StarsRow(
            this.self.querySelector('.rate-row__stars-row-place'),
            this.#config.rate,
            this.id,
        );

        starsRow.render();
    }
}
