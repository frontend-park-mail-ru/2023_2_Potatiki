import Button from '../button/button.js';
import template from './order-results.hbs';
import './order-results.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {CartActions} from '../../actions/cart.js';
import renderServerMessage from '../../modules/server-message.js';

/**
 * Класс компонента итога заказа
 */
export default class OrderResults {
    #parent;

    #config;

    #page;

    button;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        this.#page = config.page;
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

    get button() {
        return this.self.querySelector('.order-results__make-result-btn');
    }

    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    updateOrderResult = this.updateOrderResult.bind(this);
    updateOrder = this.updateOrder.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    deleteSelf = this.deleteSelf.bind(this);
    addressNotFound = this.addressNotFound.bind(this);
    serverMessage = this.serverMessage.bind(this);

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

    updateOrder(event) {
        event.preventDefault();
        CartActions.updateOrder(this.#page);
    }

    addressNotFound() {
        this.removeListeners();
        this.button.self.addEventListener('click', this.serverMessage);
    }

    serverMessage() {
        renderServerMessage('Для оформления заказа установите адрес в профиле', false);
    }


    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.EMPTY_CART, this.deleteSelf);
        eventEmmiter.subscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.EMPTY_CART, this.deleteSelf);
        eventEmmiter.unsubscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
    }


    /**
     *
     */
    removeListeners() {
        this.button.self.removeEventListener('click', this.updateOrder);
        this.button.self.removeEventListener('click', this.serverMessage);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        this.button = new Button(
            this.self,
            this.#config,
            true,
        );
        this.button.render();
        this.button.self.addEventListener('click', this.updateOrder);
        this.subscribeToEvents();
    }
}
