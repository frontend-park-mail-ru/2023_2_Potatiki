import '../templates.js';

/**
 * Класс кнопки
 */
export default class Button {
    #parent;

    #config;

    #submitHandle;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки класса
   * @param {Function} submitHandle Функция, вызываемая при нажатии на кнопку
   */
    constructor(parent, config, submitHandle) {
        this.#parent = parent;
        this.#config = config;
        this.#submitHandle = submitHandle;
    }

    /**
   * Получение элемента компонента кнопик
   */
    get self() {
        return document.getElementById(this.#config.id);
    }

    /**
   * Добавление лисенера на событие 'click'
   */
    addListeners() {
        document
            .getElementById(this.#config.id)
            .addEventListener('click', this.#submitHandle);
    }

    removeListeners() {
        document
            .getElementById(this.#config.id)
            .removeEventListener('click', this.#submitHandle);
    }

    /**
   * Отрисовка компонента кнопки
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['button.hbs'](this.#config),
        );
        this.addListeners();
    }
}
