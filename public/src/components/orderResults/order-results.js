import Button from '../button/button.js';
import template from './order-results.hbs';
import './order-results.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {CartActions} from '../../actions/cart.js';
import {renderServerMessage} from '../../modules/server-message.js';

/**
 * Класс компонента итога заказа
 */
export default class OrderResults {
    #parent;
<<<<<<< HEAD
    #config;
=======

    #config;

>>>>>>> origin/main
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

<<<<<<< HEAD
    /**
     * Взятие элемента компонента
     */
=======
>>>>>>> origin/main
    get self() {
        return document.querySelector(`.order-results`);
    }

<<<<<<< HEAD
    /**
     * Взятие элемента количества товаров
     */
=======
>>>>>>> origin/main
    get count() {
        return this.self.querySelector('#products-count');
    }

<<<<<<< HEAD
    /**
     * Взятие элемента скидки
     */
=======
>>>>>>> origin/main
    get subprice() {
        return this.self.querySelector('#subprice');
    }

<<<<<<< HEAD
    /**
     * Взятие элемента итоговоай цены
     */
=======
>>>>>>> origin/main
    get result() {
        return this.self.querySelector('#result-price');
    }

<<<<<<< HEAD
    /**
     * Вязтие кнопки создания заказа
     */
=======
>>>>>>> origin/main
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

<<<<<<< HEAD
    /**
     * Удаление компонента
     */
=======
>>>>>>> origin/main
    deleteSelf() {
        this.removeListeners();
        this.unsubscribeToEvents();
        this.self.remove();
        return;
    }

<<<<<<< HEAD
    /**
     * Обновление данных заказа
     * @param {Number} count Количество товара
     * @param {Nuber} price Сумма заказа
     */
=======
>>>>>>> origin/main
    updateOrderResult(count, price) {
        price = price.toLocaleString('ru') + ' ₽';
        this.count.textContent = `Товары(${count})`;
        this.subprice.textContent = price;
        this.result.textContent = price;
    }

<<<<<<< HEAD
    /**
     * Обновление заказа при его создании
     * @param {Event} event
     */
=======
>>>>>>> origin/main
    updateOrder(event) {
        event.preventDefault();
        CartActions.updateOrder(this.#page);
    }

<<<<<<< HEAD
    /**
     * Навешивание листенера для отображение ошибки, что адрес не найден
     */
=======
>>>>>>> origin/main
    addressNotFound() {
        this.removeListeners();
        this.button.self.addEventListener('click', this.serverMessage);
    }

<<<<<<< HEAD
    /**
     * Отображение ошибки
     */
=======
>>>>>>> origin/main
    serverMessage() {
        renderServerMessage('Для оформления заказа установите адрес в профиле', false);
    }


    /**
<<<<<<< HEAD
     * Подписка на события
=======
     *
>>>>>>> origin/main
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.EMPTY_CART, this.deleteSelf);
        eventEmmiter.subscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
    }

<<<<<<< HEAD
    /**
     * Отписка от событий
     */
=======
>>>>>>> origin/main
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.EMPTY_CART, this.deleteSelf);
        eventEmmiter.unsubscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
    }


    /**
<<<<<<< HEAD
     * Удаление листенеров
=======
     *
>>>>>>> origin/main
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
