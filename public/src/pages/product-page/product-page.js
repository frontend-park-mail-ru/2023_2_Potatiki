import Header from '../../components/header/header.js';
import template from './product-page.hbs';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {ProductsActions} from '../../actions/products.js';
import router from '../../modules/router.js';
import {notFoundRoute, productRoute, reviewRoute} from '../../config/urls.js';
import './product-page.scss';
import Product from '../../components/product/product.js';

/**
 * Класс страницы отзывов
 */
export default class ProductPage {
    #parent;
    #productId;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} params Данные о товаре
   */
    constructor(parent, params) {
        this.#parent = parent;
        this.#productId = params.idParam;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('product-page');
    }

    /**
     * Взятие конфига для отображения карточки товара
     * @param {Object} data Данные о товаре
     * @return {Object} Конфиг
     */
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
            productRate: data.rating.toFixed(1),
            reviewsCount: `${0} отзывов`,
            reviewsHref: reviewRoute + '/' + data.productId,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    /**
     * Отображение карточки товара
     * @param {Object} body Данные для отображения продукта
     */
    renderProduct(body) {
        if (!body) {
            return;
        }
        document.title = body.productName;
        const product = new Product(this.self, this.getConfig(body));
        product.render();
    }

    /**
     * Перенаправление на страницу 404
     */
    redirectToNotFound() {
        router.go({url: notFoundRoute});
    }

    redirectToNotFound = this.redirectToNotFound.bind(this);
    renderProduct = this.renderProduct.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.subscribe(Events.PRODUCT, this.renderProduct);
    }

    /**
    * Отписка от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCT, this.renderProduct);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.redirectToNotFound);
    }

    /**
    * Отрисовка страницы товара
    */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header();
        header.render();
        this.subscribeToEvents();
        ProductsActions.getProduct(this.#productId);
    }
}
