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
    #config;
    #page;
    #price;
    #discountPrice;

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
        this.#price = 0;
        this.#discountPrice = 0;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`.order-results`);
    }

    /**
     * Взятие элемента количества товаров
     */
    get count() {
        return this.self.querySelector('#products-count');
    }

    /**
     * Взятие элемента скидки
     */
    get subprice() {
        return this.self.querySelector('#subprice');
    }

    /**
     * Взятие элемента итоговоай цены
     */
    get result() {
        return this.self.querySelector('#result-price');
    }

    /**
     * Взятие элемента скидки
     */
    get discount() {
        return this.self.querySelector('#discount');
    }

    /**
     * Вязтие кнопки создания заказа
     */
    get button() {
        return this.self.querySelector(`#${this.#config.id}`);
    }
    /**
     * Удаление компонента
     */
    deleteSelf() {
        this.removeListeners();
        this.unsubscribeToEvents();
        this.self.remove();
        return;
    }

    /**
     * Обновление данных заказа
     * @param {Number} count Количество товара
     * @param {Nuber} price Сумма заказа
     */
    updateOrderResult(count, price) {
        this.#price = price;
        price = price.toLocaleString('ru') + ' ₽';
        this.count.textContent = `Товары(${count})`;
        this.subprice.textContent = price;
        this.discount.textContent = '0%';
        this.result.textContent = price;
    }

    /**
     * Пересчет цен с учетом скидки
     * @param {String} discount Размер скидки
     */
    applyPromo(discount) {
        console.log('applu promo');
        this.#discountPrice = Number((this.#price * (1-Number(discount)/100)).toFixed(0));
        const price = this.#discountPrice.toLocaleString('ru') + ' ₽';
        this.discount.textContent = discount + '%';
        this.result.textContent = price;
        console.log(price);
    }

    /**
     * Отмена промокода
     */
    cancelPromo() {
        const price = this.#price.toLocaleString('ru') + ' ₽';

        this.result.textContent = price;
        this.discount.textContent = '0%';
    }

    /**
     * Обновление заказа при его создании
     * @param {Event} event
     */
    updateOrder(event) {
        event.preventDefault();
        CartActions.updateOrder(this.#page);
    }

    /**
     * Навешивание листенера для отображение ошибки, что адрес не найден
     */
    addressNotFound() {
        this.removeListeners();
        this.button.self.addEventListener('click', this.serverMessage);
    }

    /**
     * Отображение ошибки
     */
    serverMessage() {
        renderServerMessage('Для оформления заказа установите адрес в профиле', false);
    }


    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    updateOrderResult = this.updateOrderResult.bind(this);
    updateOrder = this.updateOrder.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    deleteSelf = this.deleteSelf.bind(this);
    addressNotFound = this.addressNotFound.bind(this);
    serverMessage = this.serverMessage.bind(this);
    applyPromo = this.applyPromo.bind(this);
    cancelPromo = this.cancelPromo.bind(this);


    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.EMPTY_CART, this.deleteSelf);
        eventEmmiter.subscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
        eventEmmiter.subscribe(Events.APPLY_PROMO, this.applyPromo);
        eventEmmiter.subscribe(Events.CANCEL_PROMO, this.cancelPromo);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.EMPTY_CART, this.deleteSelf);
        eventEmmiter.unsubscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
        eventEmmiter.unsubscribe(Events.APPLY_PROMO, this.applyPromo);
        eventEmmiter.unsubscribe(Events.CANCEL_PROMO, this.cancelPromo);
    }


    /**
     * Удаление листенеров
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
