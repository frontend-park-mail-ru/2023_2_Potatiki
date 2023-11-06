import Link from '../../components/link/link.js';
import Ajax from '../../modules/ajax.js';
import renderServerMessage from '../../modules/server-message.js';
import template from './order-page.hbs';
import router from '../../modules/router.js';
import Header from '../../components/header/header';
import CartProduct from '../../components/cartProduct/cart-product';
import './order-page.css';
import OrderResults from '../../components/orderResults/order-results';
import OrderInfo from '../../components/orderInfo/order-info';
import OrderProducts from '../../components/orderProducts/order-products';
import {getCartProductsUrl, getProductsUrl, loginRoute, loginUrl, orderRoute} from '../../config/urls.js';
import {config} from '../../../config.js';
import {Events} from '../../config/events.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {UserActions} from '../../actions/user.js';
import {CartActions} from '../../actions/cart.js';

/**
 * Класс страницы оформления заказа
 */
export default class OrderPage {
    #parent;

    #config;

    userInfo;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки страницы
     */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Получение элемента страницы из документа
     */
    get self() {
        return document.querySelector('#order-page');
    }


    renderProducts(body) {
        if (!body.products || !body.products.length) {
            this.redirectToLogin();
            return;
        }
        const orderProducts = new OrderProducts(
            this.self.querySelector('.order-info-container'),
            body.products,
        );
        orderProducts.render();
    }

    redirectToLogin() {
        router.go({url: loginRoute});
    }

    updateUserInfo(data) {
        this.userInfo.self.querySelector('.name').textContent = data.login;
        this.userInfo.self.querySelector('.value').textContent = data.phone;
    }

    renderAll() {
        this.#parent.innerHTML = template();
        const header = new Header(
            this.#parent,
            this.#config.mainPage.header,
            this.#config.isAuthorized,
        );
        header.render();

        const payment = new OrderInfo(
            this.self.querySelector('.order-info-container__payment-and-user'),
            {
                name: 'Способ оплаты',
                id: 'payment-card',
                class: 'small-card order-card',
                infoRows: [
                    {
                        id: 'payment-row',
                        name: 'Оплата наличными',
                    },
                ],
            },
        );
        payment.render();

        this.userInfo = new OrderInfo(
            this.self.querySelector('.order-info-container__payment-and-user'),
            {
                id: 'user-info-card',
                name: 'Ваши данные',
                class: 'small-card order-card',
                infoRows: [
                    {
                        img: {
                            imgSrc: './static/images/' + 'user.svg',
                            imgClass: 'order-info__img',
                        },
                        id: 'user-info-row',
                        name: 'Пользователь',
                        value: '+7(800)555-35-35',
                    },
                ],
                changeLink: {
                    text: 'Изменить',
                    class: 'order-info__change-btn',
                },
            },
        );
        this.userInfo.render();

        const delivery = new OrderInfo(
            this.self.querySelector('.order-info-container'),
            {
                id: 'delivery-info-card',
                name: 'Доставка',
                class: 'big-card order-card',
                infoRows: [
                    {
                        id: 'address-row',
                        name: 'Адрес',
                        value: 'Рубцовская наб., 2/18, Москва, 105082',
                    },
                ],
                changeLink: {
                    text: 'Изменить',
                    class: 'order-info__change-btn',
                },
            },
        );
        delivery.render();

        const orderResults = new OrderResults(
            this.self.querySelector('.order-container'),
            {
                page: orderRoute,
                text: 'Оформить',
                id: 'make-order-btn',
                class: 'order-results__make-result-btn',
            },
        );
        orderResults.render();

        CartActions.getCartProducts();
        UserActions.getProfileData();
    }

    updateUserInfo = this.updateUserInfo.bind(this);
    renderProducts = this.renderProducts.bind(this);
    redirectToLogin = this.redirectToLogin.bind(this);
    renderAll = this.renderAll.bind(this);

    removeListeners() {
    }

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.subscribe(Events.PROFILE_DATA, this.updateUserInfo);
        eventEmmiter.subscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderAll);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.unsubscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.unsubscribe(Events.PAGE_ALLOWED, this.renderAll);
    }

    /**
     * Отрисовка страницы авторизации
     */
    render() {
        this.subscribeToEvents();
        UserActions.checkAuth();
    }
}
