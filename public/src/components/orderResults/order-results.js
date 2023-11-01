import Button from '../button/button.js';
import template from './order-results.hbs';
import './order-results.css';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';

/**
 * Класс компонента итога заказа
 */
export default class OrderResults {
    #parent;

    #config;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    get self() {
        return document.querySelector(`.order-results`);
    }

    get count() {
        return this.self.querySelector('#products-count');
    }

    get subprice() {
        return this.self.querySelector('#subprice');
    }

    get result() {
        return this.self.querySelector('#result-price');
    }

    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    updateOrderResult = this.updateOrderResult.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    deleteSelf = this.deleteSelf.bind(this);

    deleteSelf() {
        this.removeListeners();
        this.unsubscribeToEvents();
        this.self.remove();
        return;
    }

    updateOrderResult(count, price) {
        price = price.toLocaleString('ru') + ' ₽';
        this.count.textContent = `Товары(${count})`;
        this.subprice.textContent = price;
        this.result.textContent = price;
    }


    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.EMPTY_CART, this.deleteSelf);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.EMPTY_CART, this.deleteSelf);
    }


    /**
     *
     */
    removeListeners() {

    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const button = new Button(
            this.self,
            this.#config,
            true,
        );
        button.render();
        this.subscribeToEvents();
    }
}
