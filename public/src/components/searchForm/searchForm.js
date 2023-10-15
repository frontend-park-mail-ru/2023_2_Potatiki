import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './searchForm.hbs';

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
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }


    /**
   * Отрисовка компонента формы поиска
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const self = document.querySelector('#search-form');

        const input = new Input(self, this.#config.input);
        input.render();

        const submit = new Button(self, this.#config.submit);
        submit.render();
    }
}
