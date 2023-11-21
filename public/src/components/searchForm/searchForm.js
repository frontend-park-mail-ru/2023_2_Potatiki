import './searchForm.scss';
import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './searchForm.hbs';
import {ProductsActions} from '../../actions/products.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';

/**
 * Класс компонента формы поиска
 */
export default class SearchForm {
    #parent;
    #config;
    #isAfterBegin;

    searchInput;
    submit;
    suggest;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский компонент
     * @param {Object} config Конфиг для отрисовки класса
     * @param {Bollean} isAfterBegin
     */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     * Создание саджеста для текущей строки
     */
    getSuggest() {
        ProductsActions.getSuggest(this.searchInput.self.value);
    }

    /**
     * Обработка отправки формы поиска
     * @param {Event} event
     */
    submitHandle(event) {
        event.preventDefault();
        ProductsActions.getSearchProducts(this.searchInput.self.value);
    }

    /**
     * Отрисовка саджеста
     * @param {Array} rows Строки
     */
    renderSuggest(rows) {
        
    }

    /**
     * Удаление саджеста
     */
    hideSuggest() {
        
    }

    submitHandle = this.submitHandle.bind(this);
    getSuggest = this.getSuggest.bind(this);

    /**
     * Добавление листенеров
     */
    addEventListeners() {
        this.searchInput.self.addEventListener('change', this.getSuggest);
        this.submit.self.addEventListener('click', this.submitHandle);
    }

    /**
     * Подписка на событие
     */
    subscribeToEvents() {
        eventEmmiter.subscribe();
    }

    /**
     * Удаление листенеров
     */
    removeEventListeners() {
        this.searchInput.self.removeEventListener('change', this.makeSuggest);
        this.submit.self.removeEventListener('click', this.submitHandle);
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

        const self = document.getElementById('search-form');

        this.searchInput = new Input(self, this.#config.input);
        searchInput.render();

        submit = new Button(self, this.#config.submit);
        submit.render();

        this.addEventListeners();
    }
}
