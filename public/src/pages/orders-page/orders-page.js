import Header from '../../components/header/header.js';
import template from './orders-page.hbs';
import {config} from '../../../config.js';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import CartProduct from '../../components/cartProduct/cart-product.js';
import './orders-page.css';
import CategoryProduct from '../../components/category-product/category-product.js';
import {ProductsActions} from '../../actions/products.js';
import router from '../../modules/router.js';
import {loginRoute, notFoundRoute, productRoute} from '../../config/urls.js';
import OrderProducts from '../../components/orderProducts/order-products.js';
import {CartActions} from '../../actions/cart.js';
import renderServerMessage from '../../modules/server-message.js';
import OrderItem from '../../components/order-item/order-item.js';

/**
 * Класс главной страницы
 */
export default class OrdersPage {
    #parent;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent, params) {
        this.#parent = parent;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.querySelector('#orders-page');
    }

    getConfig(data) {
        return {
            id: `order-item-${data.id}`,
            uuid: data.id,
            status: data.statusId,
            products: data.products,
            address: `${data.city}, ${data.street}, ${data.house}, ${data.flat}`,
        };
    }

    renderOrders(body) {
        console.log(body);
        if (!body) {
            return;
        }
        body.forEach((element) => {
            const product = new OrderItem(this.self.querySelector('.orders-container'), this.getConfig(element));
            product.render();
        });
    }

    renderAll() {
        this.#parent.innerHTML = template({});

        const header = new Header(this.#parent);
        header.render();
        this.addListeners();
        CartActions.getAllOrders();
    }

    redirectToLogin() {
        router.go({url: loginRoute});
        renderServerMessage('Авторизуйтесь, чтобы просмотреть ваши заказы');
    }


    redirectToLogin = this.redirectToLogin.bind(this);
    renderOrders = this.renderOrders.bind(this);
    renderAll = this.renderAll.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.subscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderAll);
    }

    addListeners() {
    }

    /**
    *
    */
    removeListeners() {
    }

    /**
    *
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.unsubscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.unsubscribe(Events.PAGE_ALLOWED, this.renderAll);
    }

    /**
    * Отрисовка страницы регистрации
    */
    render() {
        this.subscribeToEvents();
        UserActions.checkAuth();
    }
}
