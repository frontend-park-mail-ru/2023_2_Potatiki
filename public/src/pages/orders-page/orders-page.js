import Header from '../../components/header/header.js';
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

/**
<<<<<<< HEAD
 * Класс страницы заказов пользователя
=======
 * Класс главной страницы
>>>>>>> origin/main
 */
export default class OrdersPage {
    #parent;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
<<<<<<< HEAD
    constructor(parent) {
=======
    constructor(parent, params) {
>>>>>>> origin/main
        this.#parent = parent;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('orders-page');
    }

<<<<<<< HEAD
    /**
     * Взятие конфига для отображения карточки заказа
     * @param {Object} data Данные о заказе
     * @return {Object} Конфиг
     */
=======
>>>>>>> origin/main
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

<<<<<<< HEAD
    /**
     * Отображения сообщения об отстутствие заказов
     */
=======
>>>>>>> origin/main
    noOrders() {
        this.self.querySelector('.orders-container').textContent = 'Заказы не найдены';
    }

<<<<<<< HEAD
    /**
     * Отображение заказов
     * @param {Object} body Данные о заказах
     */
=======
>>>>>>> origin/main
    renderOrders(body) {
        if (!body) {
            return;
        }
        body.forEach((element) => {
<<<<<<< HEAD
            const product = new OrderItem(this.self.querySelector('.orders-container'),
                this.getConfig(element));
=======
            const product = new OrderItem(this.self.querySelector('.orders-container'), this.getConfig(element));
>>>>>>> origin/main
            product.render();
        });
    }

<<<<<<< HEAD
    /**
     * Отображение страницы
     */
=======
>>>>>>> origin/main
    renderAll() {
        this.#parent.innerHTML = template({});

        const header = new Header();
        header.render();

        CartActions.getAllOrders();
    }

<<<<<<< HEAD
    /**
     * Перенаправление на страницу авторизации
     */
=======
>>>>>>> origin/main
    redirectToLogin() {
        router.go({url: loginRoute});
        renderServerMessage('Авторизуйтесь, чтобы просмотреть ваши заказы');
    }


    redirectToLogin = this.redirectToLogin.bind(this);
    renderOrders = this.renderOrders.bind(this);
    renderAll = this.renderAll.bind(this);
    noOrders = this.noOrders.bind(this);

<<<<<<< HEAD
    /**
     * подписка на события
     */
=======
>>>>>>> origin/main
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.subscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderAll);
        eventEmmiter.subscribe(Events.NOT_FOUND, this.noOrders);
    }

    /**
<<<<<<< HEAD
    * Отписка от событий
=======
    *
>>>>>>> origin/main
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.ALL_ORDERS, this.renderOrders);
        eventEmmiter.unsubscribe(Events.PAGE_FORBIDDEN, this.redirectToLogin);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.noOrders);
        eventEmmiter.unsubscribe(Events.PAGE_ALLOWED, this.renderAll);
    }

    /**
<<<<<<< HEAD
    * Отрисовка страницы заказов
=======
    * Отрисовка страницы регистрации
>>>>>>> origin/main
    */
    render() {
        this.subscribeToEvents();
        UserActions.checkAuth();
    }
}
