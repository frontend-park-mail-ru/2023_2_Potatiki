import './searchForm.scss';
import Button from '../button/button.js';
import Input from '../input/input.js';
import template from './searchForm.hbs';
import {ProductsActions} from '../../actions/products.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import Suggest from '../suggest/suggest.js';
import {Events} from '../../config/events.js';
import {debounce} from '../../modules/utils.js';
import router from '../../modules/router.js';

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
        this.hideSuggest(event);
        router.go({url: `/search/?product=${this.searchInput.self.value}`});
    }

    /**
     *
     * @param {*} event
     */
    enterHandle(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.searchInput.self.blur();
            this.submit.self.click();
        }
    }

    enterHandle = this.enterHandle.bind(this);

    clickSuggest(event) {
        this.searchInput.self.value = event.target.innerHTML;
        this.submit.self.click();
    }

    clickSuggest = this.clickSuggest.bind(this);

    /**
     * Отрисовка саджеста
     * @param {Array} rows Строки
     */
    renderSuggest(rows) {
        if (!rows || rows.length === 0) {
            return;
        }
        this.suggest = new Suggest(document.querySelector('.container-suggest'), rows);
        document.querySelector('#container-header').classList.add('container-header_dark');
        this.suggest.render();
        [...document.querySelectorAll('.suggest__row')].forEach((el) => {
            el.addEventListener('click', this.clickSuggest);
        });
    }

    /**
     * Удаление саджеста
     * @param {Event} event
     */
    hideSuggest(event) {
        if (event.target.name === 'search') {
            return;
        }
        this.suggest?.remove();
        document.querySelector('#container-header').classList.remove('container-header_dark');
    }


    submitHandle = this.submitHandle.bind(this);
    getSuggest = debounce(this.getSuggest.bind(this), 500);
    renderSuggest = this.renderSuggest.bind(this);
    hideSuggest = this.hideSuggest.bind(this);

    /**
     * Добавление листенеров
     */
    addEventListeners() {
        this.searchInput.self.addEventListener('input', this.getSuggest);
        this.searchInput.self.addEventListener('focusin', this.getSuggest);
        this.searchInput.self.addEventListener('keypress', this.enterHandle);
        this.submit.self.addEventListener('click', this.submitHandle);
        window.addEventListener('click', this.hideSuggest);
    }

    /**
     * Подписка на событие
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.RECIEVE_SUGGEST, this.renderSuggest);
    }

    /**
     * Удаление листенеров
     */
    removeEventListeners() {
        this.searchInput.self.removeEventListener('input', this.getSuggest);
        this.submit.self.removeEventListener('click', this.submitHandle);
        window.removeEventListener('click', this.hideSuggest);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.RECIEVE_SUGGEST, this.renderSuggest);
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
        this.searchInput.render();

        this.submit = new Button(self, this.#config.submit);
        this.submit.render();

        this.addEventListeners();
        this.subscribeToEvents();
    }
}
