import './count-management.scss';
import template from './count-management.hbs';
import Button from '../button/button';

/**
<<<<<<< HEAD
 * Класс компонента подсчета количества товара
 */
export default class CountManagement {
    #parent;
    #config;
=======
 * Класс компонента карточки товара
 */
export default class CountManagement {
    #parent;

    #config;

>>>>>>> origin/main
    #isAfterBegin;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
<<<<<<< HEAD
     * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
=======
>>>>>>> origin/main
     */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

<<<<<<< HEAD
    /**
     * Взятие элемента компонента
     */
=======
>>>>>>> origin/main
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

<<<<<<< HEAD
    /**
     * Взятие количества товара
     */
=======
>>>>>>> origin/main
    get count() {
        return this.self?.querySelector('.count-managment__count-value');
    }

<<<<<<< HEAD
    /**
     * Взятие элемента кнопки уменьшения количества товара
     */
=======
>>>>>>> origin/main
    get left() {
        return this.self?.querySelector(`#${this.#config.minus.id}`);
    }

<<<<<<< HEAD
    /**
     * Взятие элемента кнопки увелечения количества товара
     */
=======
>>>>>>> origin/main
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
