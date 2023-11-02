import Link from '../../components/link/link.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import template from './order-page.hbs';
import router from '../../modules/router.js';
import Header from '../../components/header/header';
import CartProduct from '../../components/cartProduct/cart-product';
import './order-page.css';
import OrderResults from '../../components/orderResults/order-results';
import OrderInfo from '../../components/orderInfo/order-info';
import OrderProducts from '../../components/orderProducts/order-products';
import {getCartProductsUrl, getProductsUrl} from '../../config/urls.js';
import {config} from '../../../config.js';

/**
 * Класс страницы оформления заказа
 */
export default class OrderPage {
    #parent;

    #config;

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

    /**
     * Получение и отрисовка карусели товаров
     * @param {Number} offset Сдвиг в списке товаров
     * @param {Number} count Количество запрашиваемых товаров
     */
    getProducts(offset = 0, count = 5) {
        Ajax.prototype.getRequest(getCartProductsUrl)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    const orderProducts = new OrderProducts(
                        this.self.querySelector('.order-info-container'),
                        body.products,
                    );
                    orderProducts.render();
                    break;
                case 429:
                    renderServerError(body.error || 'Ошибка');
                    break;
                default:
                    break;
                }
            });
    }

    removeListeners() {
    }

    unsubscribeToEvents() {

    }

    /**
     * Отрисовка страницы авторизации
     */
    render() {
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
                        img: {
                            imgSrc: './static/images/' + 'mir.svg',
                            imgClass: 'order-info__img',
                        },
                        id: 'payment-row',
                        name: '1234********7890',
                        value: '00/00',
                    },
                ],
                changeLink: {
                    text: 'Изменить',
                    class: 'order-info__change-btn',
                },
            },
        );
        payment.render();

        const userInfo = new OrderInfo(
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
        userInfo.render();

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
                text: 'Оформить',
                id: 'make-order-btn',
                class: 'order-results__make-result-btn',
            },
        );
        orderResults.render();

        this.getProducts();
    }
}
