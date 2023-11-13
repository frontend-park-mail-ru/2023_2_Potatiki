import Header from '../../components/header/header.js';
import template from './orders-page.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import './orders-page.css';
import router from '../../modules/router.js';
import {loginRoute} from '../../config/urls.js';
import {CartActions} from '../../actions/cart.js';
import {renderServerMessage} from '../../modules/server-message.js';
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
        let summary = 0;
        let count = 0;
        data.products.forEach((product) => {
            count += product.quantity;
            summary += product.quantity * product.price;
        });
        return {
            id: `order-item-${data.id}`,
            uuid: data.id,
            status: data.statusId,
            products: data.products,
            summary: summary.toLocaleString() + ' ₽',
            count: count,
            address: `${data.city}, ${data.street}, ${data.house}, ${data.flat}`,
        };
    }

    noOrders() {
        this.self.querySelector('.orders-container').textContent = 'Заказы не найдены';
    }

    renderOrders(body) {
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

        const header = new Header();
        header.render();

        CartActions.getAllOrders();
    }

    redirectToLogin() {
        router.go({url: loginRoute});
        renderServerMessage('Авторизуйтесь, чтобы просмотреть ваши заказы');
    }


    redirectToLogin = this.redirectToLogin.bind(this);
    renderOrders = this.renderOrders.bind(this);
    renderAll = this.renderAll.bind(this);
    noOrders = this.noOrders.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.subscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderAll);
        eventEmmiter.subscribe(Events.NOT_FOUND, this.noOrders);
    }

    /**
    *
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.unsubscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.noOrders);
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
