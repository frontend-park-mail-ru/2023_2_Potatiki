import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './searchForm.hbs';

/**
 * Класс компонента формы поиска
 */
export default class SearchForm {
    #parent;
    #config;
    #isAfterBegin;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский компонент
     * @param {Object} config Конфиг для отрисовки класса
     */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }


    /**
   * Отрисовка компонента формы поиска
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );

        const self = document.querySelector('#search-form');

        const input = new Input(self, this.#config.input);
        input.render();

        const submit = new Button(self, this.#config.submit);
        submit.render();
    }
}
