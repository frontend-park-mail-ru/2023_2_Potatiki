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
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
   * Добавление прослушивателя на событие 'click'
   */
    addListeners() {
        document
            .querySelector(`#${this.#config.id}`)
            .addEventListener('click', this.#submitHandle);
    }

    /**
     * Удаление прослушивателя
     */
    removeListeners() {
        document
            .querySelector(`#${this.#config.id}`)
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
