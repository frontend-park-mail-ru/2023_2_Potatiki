import './order-page.scss';
import template from './order-page.hbs';
import router from '../../modules/router.js';
import {header} from '../../components/header/header.js';
import OrderResults from '../../components/orderResults/order-results';
import OrderInfo from '../../components/orderInfo/order-info';
import OrderProducts from '../../components/orderProducts/order-products';
import {loginRoute, orderRoute, profileRoute} from '../../config/urls.js';
import {Events} from '../../config/events.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {UserActions} from '../../actions/user.js';
import {CartActions} from '../../actions/cart.js';
import Select from '../../components/select/select.js';
import {formatDate} from '../../modules/utils.js';
import Promocode from '../../components/promocode/promocode.js';

/**
 * Класс страницы оформления заказа
 */
export default class OrderPage {
    #parent;
    #promo;

    userInfo;
    timeSelect;
    dateSelect;
    isRendered;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг для отрисовки страницы
     */
    constructor(parent) {
        this.#parent = parent;
        this.isRendered = false;
        this.#promo = '';
    }

    /**
     * Получение элемента страницы из документа
     */
    get self() {
        return document.getElementById('order-page');
    }

    /**
     * Отображение продуктов заказа
     * @param {Object} body Данные о продуктах
     */
    renderProducts(body) {
        if (!body.products || !body.products.length) {
            this.redirectToLogin();
            return;
        }
        if (this.isRendered) {
            return;
        }
        const orderProducts = new OrderProducts(
            this.self.querySelector('.order-info-container_cart-products'),
            body.products,
            true,
        );
        orderProducts.render();
        this.isRendered = true;
    }

    /**
     * Перенаправление на страницу авторизации
     */
    redirectToLogin() {
        router.go({url: loginRoute}, true);
    }

    /**
     * Обновление информации о пользователе
     * @param {Object} data Новые данные о пользователя
     */
    updateUserInfo(data) {
        this.userInfo.self.querySelector('.name').textContent = data.login;
        this.userInfo.self.querySelector('.value').textContent = data.phone;
        this.userInfo.self.querySelector('.order-info__img').src = '/static/images/' + data.img;
    }

    /**
     * Обновление данных об адресе
     * @param {Object} data Новые данные
     */
    updateAddress(data) {
        const address = `${data.city}, ${data.street}, ${data.house}, ${data.flat}`;
        this.delivery.self.querySelector('#address-row').querySelector(
            '.value').textContent = address;
    }

    /**
     * Отображение информации о том, что адрес не найден
     */
    addressNotFound() {
        this.delivery.self.querySelector('.order-info__time-container').innerHTML = '';
        this.delivery.self.querySelector('.order-info__bottom-container').
            innerHTML = 'Адрес не найден. Для оформления заказа установите адрес в профиле';
        this.delivery.self.querySelector('.order-info__bottom-container').
            setAttribute('class', 'error');
    }

    /**
     * Отправка информации для создания заказа
     */
    sendOrderInfo() {
        const deliveryDate = this.dateSelect.getSelected();
        const deliveryTime = this.timeSelect.getSelected();
        CartActions.orderInfo(deliveryDate, deliveryTime, this.#promo);
    }

    /**
     * Сохранение промокода
     * @param {String} promo промокод
     */
    setPromo(promo) {
        this.#promo = promo;
    }

    /**
     * Отбражение данных о заказе
     */
    renderAll() {
        this.#parent.innerHTML = template();

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
                        nameClass: 'info-row__name',
                        img: {
                            imgSrc: '/static/images/user.svg',
                            imgClass: 'order-info__img',
                        },
                        id: 'user-info-row',
                        name: 'Пользователь',
                        value: '+7(800)555-35-35',
                    },
                ],
                changeLink: {
                    text: 'Изменить',
                    href: profileRoute,
                    class: 'order-info__change-btn',
                },
            },
        );
        this.userInfo.render();

        this.delivery = new OrderInfo(
            this.self.querySelector('.order-info-container_delivery-info'),
            {
                id: 'delivery-info-card',
                name: 'Доставка',
                class: 'big-card order-card',
                infoRows: [
                    {
                        id: 'address-row',
                        class: 'info-row-grid',
                        name: 'Адрес',
                    },
                ],
                changeLink: {
                    text: 'Изменить',
                    href: profileRoute,
                    class: 'order-info__change-btn',
                },
            },
        );
        this.delivery.render();
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 4; i++) {
            let date = new Date();
            date.setDate(today.getDate() + i + 1);
            date = formatDate(date);
            dates.push({
                data: date,
            });
        }
        this.dateSelect = new Select(
            this.delivery.time,
            {
                id: 'date-select',
                name: 'Дата',
                options: dates,
            },
        );
        this.dateSelect.render();
        this.timeSelect = new Select(
            this.delivery.time,
            {
                id: 'time-select',
                name: 'Время',
                options: [
                    {data: '10:00 - 12:00'},
                    {data: '12:00 - 14:00'},
                    {data: '14:00 - 16:00', selected: true},
                    {data: '16:00 - 18:00'},
                ],
            },
        );
        this.timeSelect.render();


        const orderResults = new OrderResults(
            this.self.querySelector('.order-container__support'),
            {
                page: orderRoute,
                text: 'Оформить',
                id: 'make-order-btn',
                class: 'order-results__make-result-btn',
            },
        );
        orderResults.render();

        const promocode = new Promocode(
            this.self.querySelector('.order-container__support'),
            {
                text: 'Применить промокод',
                id: 'apply-promo-btn',
                class: 'order-results__make-result-btn',
            },
        );
        promocode.render();

        CartActions.getCartProducts();
        UserActions.getProfileData();
        UserActions.getCurrentAddress();
        UserActions.getCSRFToken(orderRoute);
    }

    setPromo = this.setPromo.bind(this);
    sendOrderInfo = this.sendOrderInfo.bind(this);
    addressNotFound = this.addressNotFound.bind(this);
    updateAddress = this.updateAddress.bind(this);
    updateUserInfo = this.updateUserInfo.bind(this);
    renderProducts = this.renderProducts.bind(this);
    redirectToLogin = this.redirectToLogin.bind(this);
    renderAll = this.renderAll.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.subscribe(Events.PROFILE_DATA, this.updateUserInfo);
        eventEmmiter.subscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderAll);
        eventEmmiter.subscribe(Events.CURRENT_ADDRESS, this.updateAddress);
        eventEmmiter.subscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
        eventEmmiter.subscribe(Events.SEND_ORDER_INFO, this.sendOrderInfo);
        eventEmmiter.subscribe(Events.SET_PROMO, this.setPromo);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.unsubscribe(Events.CART_PRODUCTS, this.renderProducts);
        eventEmmiter.unsubscribe(Events.PAGE_ALLOWED, this.renderAll);
        eventEmmiter.unsubscribe(Events.CURRENT_ADDRESS, this.updateAddress);
        eventEmmiter.unsubscribe(Events.PROFILE_DATA, this.updateUserInfo);
        eventEmmiter.unsubscribe(Events.ADDRESS_NOT_FOUND, this.addressNotFound);
        eventEmmiter.unsubscribe(Events.SEND_ORDER_INFO, this.sendOrderInfo);
        eventEmmiter.unsubscribe(Events.SET_PROMO, this.setPromo);
    }

    /**
     * Отрисовка страницы заказа
     */
    render() {
        this.subscribeToEvents();
        UserActions.checkAuth();
    }
}
