import AddToCartButton from '../addToCartButton/add-to-cart-button.js';
import Link from '../link/link.js';
import template from './review-product.hbs';
import './review-product.scss';
import router from '../../modules/router.js';
import {cartRoute, productRoute} from '../../config/urls.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import Button from '../button/button.js';
import {ProductsActions} from '../../actions/products.js';

/**
 * Класс компонента карточки товара на странице товара
 */
export default class ReviewProduct {
    #parent;
    #data;
    #isAfterBegin;
    #productId;

    button;
    toCartButton;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
   */
    constructor(parent, productId, isAfterBegin) {
        this.#parent = parent;
        this.#productId = productId;
        this.#isAfterBegin = isAfterBegin;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`.review-product`);
    }

    /**
     * Взятие конфига для отобрадения карточки товара
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
    getConfig(data) {
        console.log(data);
        return {
            id: `review-product-${data.productId}`,
            category: data.categoryName,
            categoryHref: `/category/${data.productId}`,
            data: data,
            quantity: data.quantity,
            img: {
                imgSrc: '/static/images/' + data.img,
                imgClass: 'category-card__img',
                href: productRoute + '/' + data.productId,
            },
            name: {
                text: data.productName,
                href: productRoute + '/' + data.productId,
                textClass: 'review-product__name-text',
            },
            button: {
                class: 'product-card__button_size_in-cart button_disabled',
                type: 'button',
                id: `product-${data.id}-button`,
                text: 'В корзину',
                imgSrc: '/static/images/cart-icon.svg',
            },
            starHref: '/static/images/star-purple.svg',
            productRate: data.rating,
            reviewsCount: `0 отзывов`,
            price: data.price.toLocaleString() + ' ₽',
        };
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
        if (data.productId != this.#data.productId) {
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
        if (data.productId != this.#data.productId) {
            return;
        }
        if (this.toCartButton) {
            this.removeListeners();
            this.toCartButton.self.remove();
        }
    }

    renderAll(data) {
        this.#data = data;
        const config = this.getConfig(this.#data);
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(config),
        );

        const img = new Link(
            this.self.querySelector('.product__img-place'),
            config.img,
        );
        img.render();

        const name = new Link(
            this.self.querySelector('.review-product__name'),
            config.name,
        );
        name.render();

        const button = new AddToCartButton(
            this.self.querySelector('.product__management'),
            config.data,
            config.id,
            'add-to-cart-container',
        );
        button.render();

        if (config.quantity) {
            this.renderToCartButton(config.data);
        }
    }

    renderAll = this.renderAll.bind(this);
    renderToCartButton = this.renderToCartButton.bind(this);
    redirectToCart = this.redirectToCart.bind(this);
    removeToCartButton = this.removeToCartButton.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PRODUCT, this.renderAll);
        eventEmmiter.subscribe(Events.ADD_PRODUCT_SUCCESS, this.renderToCartButton);
        eventEmmiter.subscribe(Events.DEL_PRODUCT_SUCCESS, this.removeToCartButton);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCT, this.renderAll);
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
        ProductsActions.getProduct(this.#productId);
    }
}
