import template from './button.hbs';

/**
 * Класс кнопки
 */
export default class Button {
    #parent;

    #config;


    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки класса
   * @param {Function} submitHandle Функция, вызываемая при нажатии на кнопку
   */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
   * Получение элемента компонента кнопик
   */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
   * Отрисовка компонента кнопки
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );
    }
}
