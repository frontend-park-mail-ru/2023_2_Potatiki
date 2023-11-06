import template from './button.hbs';

/**
 * Класс кнопки
 */
export default class Button {
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

    get img() {
        return this.self.querySelector(`.${this.#config.imgClass}`);
    }

    /**
   * Отрисовка компонента кнопки
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );
    }
}
