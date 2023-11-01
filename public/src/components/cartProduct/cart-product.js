import Link from '../link/link.js';
import template from './cart-product.hbs';
import './cart-product.css';
import CountManagement from '../countManagement/count-management';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';

/**
 * Класс компонента карточки товара
 */
export default class CartProduct {
    #parent;

    #config;

    #data;

    #management;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        this.#data = this.#config.data;
        console.log(this.#data);
    }

    getManagmentConfig(quantity) {
        return {
            id: `cart-page-count-management-${this.#data.id}`,
            quantity: quantity,
            minus: {
                id: `minus-${this.#data.id}`,
                class: 'count-management__button',
                imgClass: 'count-management__img',
                imgSrc: './static/images/' + 'minus.svg',
            },
            plus: {
                id: `plus-${this.#data.id}`,
                imgSrc: './static/images/' + 'plus.svg',
                imgClass: 'count-management__img',
                class: 'count-management__button count-management__button-right',
            },
        };
    }

    renderCountManagement(data) {
        if (data.id !== this.#data.id || !this.self?.querySelector('.cart-product__count-management')) {
            return;
        }
        this.self.querySelector('.cart-product__count-management').innerHTML = '';
        this.#data.quantity = data.quantity;
        this.management = new CountManagement(this.self.querySelector('.cart-product__count-management'), this.getManagmentConfig(data.quantity));
        this.management.render();
        this.management.left.addEventListener('click', this.decreaseQuantity);
        this.management.right.addEventListener('click', this.increaseQuantity);
    }


    renderCountManagement = this.renderCountManagement.bind(this);
    decreaseQuantity = this.decreaseQuantity.bind(this);
    increaseQuantity = this.increaseQuantity.bind(this);
    delProduct = this.delProduct.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    decreaseQuantity(event) {
        console.log('cart decrease');
        event.preventDefault();
        UserActions.changeQuantityLocal(this.#data, true);
    }

    increaseQuantity(event) {
        event.preventDefault();
        UserActions.changeQuantityLocal(this.#data);
    }

    delProduct(data) {
        if (data.id !== this.#data.id || !this.self) {
            return;
        }
        this.unsubscribeToEvents();
        console.log(this.#parent, this.self);
        this.removeListeners();
        this.self.remove();
        // this.#parent.removeChild(this.self);
    }

    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CHG_PRODUCT_SUCCESS, this.renderCountManagement);
        eventEmmiter.subscribe(Events.DEL_PRODUCT_SUCCESS, this.delProduct);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     *
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.ADD_PRODUCT_SUCCESS, this.renderCountManagement);
        eventEmmiter.unsubscribe(Events.DEL_PRODUCT_SUCCESS, this.renderCountManagement);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    removeListeners() {
        this.management.left.removeEventListener('click', this.decreaseQuantity);
        this.management.right.removeEventListener('click', this.increaseQuantity);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        // const self = document.querySelector(`#${this.#config.id}`);

        const name = new Link(
            this.self,
            this.#config.name,
            true,
        );
        name.render();

        const img = new Link(
            this.self,
            this.#config.img,
            true,
        );
        img.render();

        const addToFavourite = new Link(
            this.self.querySelector('.cart-product__management'),
            this.#config.fav,
        );
        addToFavourite.render();

        const deleteProduct = new Link(
            this.self.querySelector('.cart-product__management'),
            this.#config.del,
        );
        deleteProduct.render();

        this.renderCountManagement(this.#data);
        this.subscribeToEvents();
    }
}
