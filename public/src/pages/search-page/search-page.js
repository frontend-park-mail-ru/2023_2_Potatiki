import {ProductsActions} from '../../actions/products';
import {Events} from '../../config/events';
import {eventEmmiter} from '../../modules/event-emmiter';
import template from './search-page.hbs';
import CategoryProduct from '../../components/category-product/category-product.js';
import {productRoute, reviewRoute} from '../../config/urls';
import {header} from '../../components/header/header.js';
import './search-page.scss';
import {rateCase} from '../../modules/utils.js';
import {UserActions} from '../../actions/user.js';

/**
 * Класс страницы товаров поискового запроса
 */
export default class SearchPage {
    #parent;
    #products;

    /**
     * Конструктор компонента страницы
     * @param {Element} parent Родительский элемент
     */
    constructor(parent) {
        this.#parent = parent;
        this.#products = [];
    }

    /**
     * Взятие конфига для отображения карточки товара поискового запроса
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
    getConfig(data) {
        return {
            id: `category-product-${data.productId}`,
            category: data.category.categoryName,
            categoryHref: `/category/${data.category.categoryId}`,
            data: data,
            quantity: data.quantity,
            img: {
                imgSrc: '/static/images/' + data.img,
                imgClass: 'category-card__img',
                href: productRoute + '/' + data.productId,
            },
            name: {
                text: data.productName,
                href: productRoute + '/' + data.productId,
            },
            button: {
                class: 'product-card__button_size_in-cart button_disabled',
                type: 'button',
                id: `product-${data.id}-button`,
                text: 'В корзину',
                imgSrc: '/static/images/cart-icon.svg',
            },
            starHref: '/static/images/star-purple.svg',
            productRate: data.rating.toFixed(1),
            reviewsCount: data.countComments + ' ' + rateCase(data.countComments),
            reviewsHref: reviewRoute + '/' + data.productId,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    /**
     * Отображение продуктов поискового запроса
     * @param {Object} body Данные о продуктах запроса
     * @param {String} queryValue Запрос поля поиска
     */
    renderProducts(body, queryValue) {
        if (queryValue) {
            document.querySelector(`[name='search']`).value = queryValue;
        }
        if (!body || !body.length) {
            document.querySelector('.search-products-container').innerHTML =
                'По данному запросу ничего не найдено';
            return;
        }
        document.querySelector('.search-products-container').innerHTML = '';
        this.#products = body;
        body.forEach((element) => {
            const product = new CategoryProduct(
                document.querySelector('.search-products-container'), this.getConfig(element));
            product.render();
        });
    }

    /**
     * Обработка выбора сортировки
     * @param {Event} event
     */
    selectHandle(event) {
        UserActions.localRemoveListeners();
        switch (document.querySelector('#sort-select').value) {
        case 'popular':
            this.#products.sort((a, b) => {
                return a.name - b.name;
            });
            break;
        case 'price-asc':
            this.#products.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        case 'price-desc':
            this.#products.sort((a, b) => {
                return b.price - a.price;
            });
            break;
        case 'rating':
            this.#products.sort((a, b) => {
                return b.rating - a.rating;
            });
            break;
        }

        this.renderProducts(this.#products);
    }

    selectHandle = this.selectHandle.bind(this);
    renderProducts = this.renderProducts.bind(this);

    /**
     * Добавление листенеров
     */
    addEventListeners() {
        document.querySelector('#sort-select').addEventListener('change', this.selectHandle);
    }

    /**
     * Удаление листенеров
     */
    removeListeners() {
        document.querySelector('#sort-select').removeEventListener('change', this.selectHandle);
        document.querySelector(`[name='search']`).value = '';
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.SUCCESSFUL_GET_SEARCH_PRODUCTS, this.renderProducts);
    }

    /**
     * Отиска на события
     */
    unsubscribeToEvents() {
        eventEmmiter.subscribe(Events.SUCCESSFUL_GET_SEARCH_PRODUCTS, this.renderProducts);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        const queryString = location.search;
        if (queryString) {
            const params = new URLSearchParams(queryString);
            ProductsActions.getSearchProducts(params.get('product'));
        }
        this.#parent.innerHTML = template();

        header.render();

        this.subscribeToEvents();
        this.addEventListeners();
    }
}
