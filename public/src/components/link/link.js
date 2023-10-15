import template from './link.hbs';

/**
 * Класс компонента ссылки
 */
export default class Link {
    #parent;

    #config;

    /**
   * Конструктор класса ссылки
   * @param {Element} parent Родительский компонент
   * @param {Object} config Конфиг для отрисовки компонента
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
   * Отрисовка компонента ссылки
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}
