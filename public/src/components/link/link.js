import template from './link.hbs';

/**
 * Класс компонента ссылки
 */
export default class Link {
    #parent;

    #config;

    #isAfterBegin;

    /**
   * Конструктор класса ссылки
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
   * Отрисовка компонента ссылки
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );
    }
}
