import Link from '../../components/link/link.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import template from './cart-page.hbs';
import router from '../../modules/router.js';
import Header from '../../components/header/header';
import CartProduct from '../../components/cartProduct/cart-product';
import {config, getProductsUrl} from '../../../config';
import './cart-page.css';
import OrderResults from '../../components/orderResults/order-results';
import {getProducts} from '../../config/urls.js';
import {Events} from '../../config/events.js';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';

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
            id: `cart-product-${data.id}`,
            data: data,
            quantity: data.quantity,
            img: {
                imgSrc: './static/images/' + data.img,
                imgClass: 'cart-product__img',
            },
            name: {
                text: data.name,
                spanClass: 'cart-product__name',
            },
            price: data.price.toLocaleString() + ' ₽',
            del: {
                text: 'Удалить',
                href: '#',
                spanClass: 'cart-product__management-link',
            },
            fav: {
                text: 'В избранное',
                href: '#',
                spanClass: 'cart-product__management-link',
            },
            management: {
                id: `count-management-${data.id}`,
                quantity: data.quantity,
                minus: {
                    id: `minus-${data.id}`,
                    class: 'count-management__button',
                    imgClass: 'count-management__img',
                    imgSrc: './static/images/' + 'minus.svg',
                },
                plus: {
                    id: `plus-${data.id}`,
                    imgSrc: './static/images/' + 'plus.svg',
                    imgClass: 'count-management__img',
                    class: 'count-management__button count-management__button-right',
                },
            },
        };
    }

    renderProducts(body) {
        if (!body.products.length) {
            const emptyCart = new Link(
                this.self.querySelector('.cart-container__products'),
                {text: 'Корзина пуста'},
            );
            emptyCart.render();
            return;
        }
        body.products.forEach((element) => {
            console.log('render');
            const product = new CartProduct(
                this.self.querySelector('.cart-container__products'),
                this.getConfig(element),
            );
            product.render();
        });
    }

    renderCartResult() {
        this.orderResults = new OrderResults(
            this.self.querySelector('.order-container'),
            {
                text: 'Перейти к оформлению',
                id: 'go-to-making-order-btn',
                class: 'order-results__make-result-btn',
            },
        );
        this.orderResults.render();
    }

    updateOrderResult(count, price) {
        price = price.toLocaleString('ru') + ' ₽';
        this.orderResults.count.textContent = `Товары(${count})`;
        this.orderResults.subprice.textContent = price;
        this.orderResults.result.textContent = price;
    }

    updateOrderResult = this.updateOrderResult.bind(this);
    renderProducts = this.renderProducts.bind(this);
    /**
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.subscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.unsubscribe(Events.UPDATE_CART_RESULT, this.updateOrderResult);
    }

    removeListeners() {
    }

    /**
     * Отрисовка страницы авторизации
     */
    render() {
        console.log(this.#parent);
        this.#parent.innerHTML = template();
        const header = new Header(
            this.#parent,
            this.#config.mainPage.header,
            this.#config.isAuthorized,
        );
        header.render();
        this.renderCartResult();
        this.subscribeToEvents();

        // this.getProducts();
        UserActions.getCartProducts();
    }
}
