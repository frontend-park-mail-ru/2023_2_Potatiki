import AddToCartButton from '../addToCartButton/add-to-cart-button.js';
import Link from '../link/link.js';
import template from './product.hbs';
import './product.scss';
import router from '../../modules/router.js';
import {cartRoute} from '../../config/urls.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import Button from '../button/button.js';

/**
 * Класс компонента карточки товара на странице товара
 */
export default class Product {
    #parent;
    #config;
    #isAfterBegin;

    button;
    toCartButton;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг отрисовки класса
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, config, isAfterBegin) {
        this.#parent = parent;
        this.#config = config;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`#${this.#config.id}`);
    }

    /**
     * Редиреrт на стриницу корзины
     * @param {Event} event Событие вызывающее редирект
     */
    redirectToCart(event) {
        event.preventDefault();
        router.go({url: cartRoute});
    }

    /**
     * Отрисовка кнопки добавления в корзину
     * @param {Object} data Данные для нахождения нужной карточки товара
     */
    renderToCartButton(data) {
        if (data.productId != this.#config.data.productId) {
            return;
        }
        this.toCartButton = new Button(
            this.self.querySelector('.product__management'),
            {
                id: 'to-cart-btn-' + data.productId,
                text: 'К корзине',
                class: 'product-card__button_size_in-cart product__to-cart-btn',
            },
        );
        this.toCartButton.render();
        this.toCartButton.self.addEventListener('click', this.redirectToCart);
    }

    /**
     * Удаление кнопки добавления в корзину
     * @param {Obkect} data Данные для нахождения нужной карточки товара
     */
    removeToCartButton(data) {
        if (data.productId != this.#config.data.productId) {
            return;
        }
        if (this.toCartButton) {
            this.removeListeners();
            this.toCartButton.self.remove();
        }
    }

    renderToCartButton = this.renderToCartButton.bind(this);
    redirectToCart = this.redirectToCart.bind(this);
    removeToCartButton = this.removeToCartButton.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.ADD_PRODUCT_SUCCESS, this.renderToCartButton);
        eventEmmiter.subscribe(Events.DEL_PRODUCT_SUCCESS, this.removeToCartButton);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.ADD_PRODUCT_SUCCESS, this.renderToCartButton);
        eventEmmiter.unsubscribe(Events.DEL_PRODUCT_SUCCESS, this.removeToCartButton);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Удалеие листенеров
     */
    removeListeners() {
        this.toCartButton?.self?.removeEventListener('click', this.redirectToCart);
    }

    /**
   * Отрисовка компонента карточки продукта
   */
    render() {
        this.subscribeToEvents();
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(this.#config),
        );

        const img = new Link(
            this.self.querySelector('.product__img-place'),
            this.#config.img,
        );
        img.render();

        const name = new Link(
            this.self.querySelector('.product__name'),
            this.#config.name,
        );
        name.render();

        const button = new AddToCartButton(
            this.self.querySelector('.product__management'),
            this.#config.data,
            this.#config.id,
            'add-to-cart-container',
        );
        button.render();

        if (this.#config.quantity) {
            this.renderToCartButton(this.#config.data);
        }
    }
}
