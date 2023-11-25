import Header from '../../components/header/header.js';
import template from './product-page.hbs';
<<<<<<< HEAD
=======
import {config} from '../../../config.js';
>>>>>>> origin/main
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {ProductsActions} from '../../actions/products.js';
import router from '../../modules/router.js';
import {notFoundRoute, productRoute} from '../../config/urls.js';
import './product-page.scss';
import Product from '../../components/product/product.js';

/**
<<<<<<< HEAD
 * Класс страницы товара
 */
export default class ProductPage {
    #parent;
    #productId;

    loadedProducts;
    endOfPage;
    timer;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемен
   * @param {Object} params Даннае о товаре
   */
    constructor(parent, params) {
        this.#parent = parent;
=======
 * Класс главной страницы
 */
export default class ProductPage {
    #parent;

    #config;

    #productId;

    loadedProducts;

    endOfPage;

    timer;


    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent, params) {
        this.#parent = parent;
        this.#config = config.mainPage;
>>>>>>> origin/main
        this.endOfPage = false;
        this.timer = null;
        this.#productId = params.idParam;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('product-page');
    }

<<<<<<< HEAD
    /**
     * Взятие конфига для отображения карточки товара
     * @param {Object} data Данные о товаре
     * @return {Object} Конфиг
     */
=======
>>>>>>> origin/main
    getConfig(data) {
        return {
            id: `category-product-${data.productId}`,
            category: data.categoryName,
            categoryHref: `/category/${data.categoryId}`,
            data: data,
            quantity: data.quantity,
            description: data.description,
            img: {
                imgSrc: '/static/images/' + data.img,
                imgClass: 'product__img',
                href: productRoute + '/' + data.productId,
            },
            name: {
                text: data.productName,
                spanClass: 'product__name',
                href: productRoute + '/' + data.productId,
            },
            button: {
                class: 'product-card__button_size_in-cart button_disabled',
                type: 'button',
                id: `product-${data.productId}-button`,
                text: 'В корзину',
                imgSrc: '/static/images/cart.svg',
            },
            starHref: '/static/images/star-purple.svg',
            productRate: data.rating,
            reviewsCount: `${0} отзывов`,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

<<<<<<< HEAD
    /**
     * Отображение карточки товара
     * @param {Object} body Данные для отображения продукта
     */
=======
>>>>>>> origin/main
    renderProduct(body) {
        if (!body) {
            return;
        }
        const product = new Product(this.self, this.getConfig(body));
        product.render();
    }

<<<<<<< HEAD
    /**
     * Перенаправление на страницу 404
     */
=======
>>>>>>> origin/main
    redirectToNotFound() {
        router.go({url: notFoundRoute});
    }

    redirectToNotFound = this.redirectToNotFound.bind(this);
    renderProduct = this.renderProduct.bind(this);

<<<<<<< HEAD
    /**
     * Подписка на события
     */
=======
>>>>>>> origin/main
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.subscribe(Events.PRODUCT, this.renderProduct);
    }

    /**
<<<<<<< HEAD
    * Отписка от событий
=======
    *
>>>>>>> origin/main
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCT, this.renderProduct);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.redirectToNotFound);
    }

    /**
<<<<<<< HEAD
    * Отрисовка страницы товара
=======
    * Отрисовка страницы регистрации
>>>>>>> origin/main
    */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header();
        header.render();
        this.subscribeToEvents();
        ProductsActions.getProduct(this.#productId);
    }
}
