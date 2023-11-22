import './suggest.scss';
import template from './suggest.hbs';

/**
 * Класс компонента саджеста
 */
export default class Suggest {
    #parent;
    #rows;

    /**
     * Конструктор класса
     * @param {Element} parent Родительсктй элемент
     * @param {Array} rows Строки в саджесте
     */
    constructor(parent, rows) {
        this.#parent = parent;
        this.#rows = rows;
    }

    /**
     * Удаление элемента компонента
     */
    remove() {
        this.#parent.innerHTML = '';
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.innerHTML = template({rows: this.#rows});
        console.log(this.#rows);
    }
}
