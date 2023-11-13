import template from './cart-page.hbs';
import Header from '../../components/header/header';
import CartProduct from '../../components/cartProduct/cart-product';
import {config} from '../../../config';
import './cart-page.css';
import OrderResults from '../../components/orderResults/order-results';
import {cartRoute, productRoute} from '../../config/urls.js';
import {Events} from '../../config/events.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {CartActions} from '../../actions/cart.js';

/**
 * Класс страницы корзины
 */
export default class CartPage {
    #parent;

    #config;

    orderResults;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Получение элемента страницы из документа
     */
    get self() {
        return document.querySelector('#cart-page');
    }

    getConfig(data) {
        return {
            id: `cart-product-${data.productId}`,
            data: data,
            quantity: data.quantity,
            img: {
                imgSrc: '/static/images/' + data.img,
                imgClass: 'cart-product__img',
                href: productRoute + '/' + data.productId,
                class: 'cart-product__img-place',
            },
            name: {
                text: data.productName,
                spanClass: 'cart-product__name',
                href: productRoute + '/' + data.productId,
            },
            price: data.price.toLocaleString() + ' ₽',
            del: {
                id: `count-management-del-${data.productId}`,
                text: 'Удалить',
                href: '#',
                class: 'cart-product__management-button',
                spanClass: 'cart-product__management-button-text',
                imgClass: 'count-management__img',
                imgSrc: '/static/images/' + 'garbage.svg',
            },
            management: {
                id: `count-management-${data.productId}`,
                quantity: data.quantity,
                minus: {
                    id: `minus-${data.productId}`,
                    class: 'count-management__button',
                    imgClass: 'count-management__img',
                    imgSrc: './static/images/' + 'minus.svg',
                },
                plus: {
                    id: `plus-${data.productId}`,
                    imgSrc: '/static/images/' + 'plus.svg',
                    imgClass: 'count-management__img',
                    class: 'count-management__button count-management__button-right',
                },
            },
        };
    }

    renderEmptyCartMessage() {
        this.self.querySelector('.cart-container__products').textContent = 'Корзина пуста';
    }

    renderProducts(body) {
        if (!body.products || !body.products.length) {
            this.renderEmptyCartMessage();
            return;
        }
        body.products.forEach((element) => {
            const product = new CartProduct(
                this.self.querySelector('.cart-container__products'),
                this.getConfig(element),
            );
            product.render();
        });
        this.renderCartResult();
    }

    renderCartResult() {
        this.orderResults = new OrderResults(
            this.self.querySelector('.order-container'),
            {
                page: cartRoute,
                text: 'Перейти к оформлению',
                id: 'go-to-making-order-btn',
                class: 'order-results__make-result-btn',
            },
        );
        this.orderResults.render();
    }


    renderProducts = this.renderProducts.bind(this);
    renderEmptyCartMessage = this.renderEmptyCartMessage.bind(this);

    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.subscribe(Events.EMPTY_CART, this.renderEmptyCartMessage);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.unsubscribe(Events.EMPTY_CART, this.renderEmptyCartMessage);
    }

    /**
     * Отрисовка страницы авторизации
     */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header();
        header.render();

        this.subscribeToEvents();

        CartActions.getCartProducts();
    }
}
