import {header} from '../../components/header/header.js';
import template from './orders-page.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import './orders-page.scss';
import router from '../../modules/router.js';
import {loginRoute} from '../../config/urls.js';
import {CartActions} from '../../actions/cart.js';
import {renderServerMessage} from '../../modules/server-message.js';
import OrderItem from '../../components/order-item/order-item.js';
import {getDateForReview} from '../../modules/utils.js';

/**
 * Класс страницы заказов пользователя
 */
export default class OrdersPage {
    #parent;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('orders-page');
    }

    /**
     * Взятие конфига для отображения карточки заказа
     * @param {Object} data Данные о заказе
     * @return {Object} Конфиг
     */
    getConfig(data) {
        let summary = 0;
        let count = 0;
        data.products.forEach((product) => {
            count += product.quantity;
            summary += product.quantity * product.price;
        });

        console.log(data.promocodeName);
        console.log(data.promocodeName.substring(data.promocodeName.lenght - 2));
        const discount = +data.promocodeName.substring(data.promocodeName.lenght - 2);
        summary = summary * (100 - discount) / 100;

        return {
            id: `order-item-${data.id}`,
            uuid: data.id,
            status: data.status,
            products: data.products,
            summary: summary.toLocaleString() + ' ₽',
            count: count,
            address: `${data.address.city}, ${data.address.street}, ${data.address.house}, ${data.address.flat}`,
            creationDate: getDateForReview(data.creationDate),
            deliveryDate: data.deliveryDate,
            deliveryTime: data.deliveryTime,
        };
    }

    /**
     * Отображения сообщения об отстутствие заказов
     */
    noOrders() {
        this.self.querySelector('.orders-container').textContent = 'Заказы не найдены';
    }

    /**
     * Отображение заказов
     * @param {Object} body Данные о заказах
     */
    renderOrders(body) {
        if (!body) {
            return;
        }
        body.forEach((element) => {
            const product = new OrderItem(this.self.querySelector('.orders-container'),
                this.getConfig(element));
            product.render();
        });
    }

    /**
     * Отображение страницы
     */
    renderAll() {
        this.#parent.innerHTML = template({});

        header.render();

        CartActions.getAllOrders();
    }

    /**
     * Перенаправление на страницу авторизации
     */
    redirectToLogin() {
        router.go({url: loginRoute}, true);
        renderServerMessage('Авторизуйтесь, чтобы просмотреть ваши заказы');
    }


    redirectToLogin = this.redirectToLogin.bind(this);
    renderOrders = this.renderOrders.bind(this);
    renderAll = this.renderAll.bind(this);
    noOrders = this.noOrders.bind(this);

    /**
     * подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.subscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderAll);
        eventEmmiter.subscribe(Events.NOT_FOUND, this.noOrders);
    }

    /**
    * Отписка от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.unsubscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.noOrders);
        eventEmmiter.unsubscribe(Events.PAGE_ALLOWED, this.renderAll);
    }

    /**
    * Отрисовка страницы заказов
    */
    render() {
        this.subscribeToEvents();
        UserActions.checkAuth();
    }
}
