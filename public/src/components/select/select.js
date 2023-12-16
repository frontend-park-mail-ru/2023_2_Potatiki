import template from './select.hbs';
import './select.scss';

/**
 * Класс компонента выпадающего списка
 */
export default class Select {
    #parent;
    #config;
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
     * Получение выбранной опции
     * @return {String} Значение выбранной опции
     */
    getSelected() {
        console.log(this.self.querySelector('.select').selectedOptions[0].label);
        return this.self.querySelector('.select').selectedOptions[0].label;
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
    }
}
