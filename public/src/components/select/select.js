import template from './select.hbs';
import './select.scss';

/**
<<<<<<< HEAD
 * Класс компонента выпадающего списка
 */
export default class Select {
    #parent;
    #config;
=======
 * Класс кнопки
 */
export default class Select {
    #parent;

    #config;

>>>>>>> origin/main
    #isAfterBegin;


    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки класса
   * @param {Boolean} isAfterBegin Флаг при котором элемент вставляется в начало
   */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
   * Получение элемента компонента кнопик
   */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
<<<<<<< HEAD
   * Отрисовка компонента
=======
   * Отрисовка компонента кнопки
>>>>>>> origin/main
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );
    }
}
