import Link from '../link/link.js';
import template from './cart-icon.hbs';
import './cart-icon.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';

/**
 * Класс компонента иконки корзины
 */
export default class CartIcon {
    #parent;
    #config;
    #isCountHidden;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        this.#isCountHidden = true;
    }

    /**
     * Взятие элемента компонента строчки
     */
    get self() {
        return this.#parent.querySelector(`.cart-icon__container`);
    }

    /**
     * Обновление количества товара в корзине
     * @param {Number} count Количество товара в корзине
     */
    updateCartCount(count) {
        if (!count) {
            this.#isCountHidden = true;
            this.self.querySelector('.cart-icon__count').className = 'cart-icon__count hidden';
            return;
        }
        if (count > 0 && this.#isCountHidden) {
            this.#isCountHidden = false;
            this.self.querySelector('.cart-icon__count').className = 'cart-icon__count';
        }
        this.self.querySelector('.cart-icon__count').textContent = count;
    }

    updateCartCount = this.updateCartCount.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);


    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.UPDATE_CART_ICON, this.updateCartCount);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.UPDATE_CART_ICON, this.updateCartCount);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        const icon = new Link(
            this.self,
            this.#config,
            true,
        );
        icon.render();

        this.subscribeToEvents();
    }
}
