import Button from '../button/button.js';
import Input from '../input/input.js';
import '../templates.js';

/**
 * Класс компонента формы поиска
 */
export default class SearchForm {
    #parent;
    #config;
    #submitHandle;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский компонент
     * @param {Object} config Конфиг для отрисовки класса
     * @param {Function} submitHandle Функция, вызываемая при отправке формы
     */
    constructor(parent, config, submitHandle) {
        this.#parent = parent;
        this.#config = config;
        this.#submitHandle = submitHandle;
    }


    /**
   * Отрисовка компонента формы поиска
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['searchForm.hbs'](this.#config),
        );

        const self = document.getElementById('search-form');

        const input = new Input(self, this.#config.input);
        input.render();

        const submit = new Button(self, this.#config.submit, this.#submitHandle);
        submit.render();
    }
}
