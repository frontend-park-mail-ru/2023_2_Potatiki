import {ProductsActions} from '../../actions/products';
import {Events} from '../../config/events';
import {eventEmmiter} from '../../modules/event-emmiter';
import template from './search-page.hbs';
import CategoryProduct from '../../components/category-product/category-product.js';
import {productRoute} from '../../config/urls';
import Header from '../../components/header/header.js';
import './search-page.scss';

/**
 * Класс страницы товаров поиска
 */
export default class SearchPage {
    #parent;
    #products;

    /**
     *
     * @param {*} parent
     */
    constructor(parent) {
        this.#parent = parent;
        this.#products = [];
    }

    /**
     * Взятие конфига для отображения карточки товара категории
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
    getConfig(data) {
        return {
            id: `category-product-${data.productId}`,
            category: data.categoryName,
            categoryHref: `/category/${data.categoryId}`,
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
            reviewsCount: `${0} отзывов`,
            reviewsHref: reviewRoute + '/' + data.productId,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    /**
     * Отображение продуктов категории
     * @param {Object} body Данные о продуктах категории
     * @param {*} queryValue
     */
    renderProducts(body, queryValue) {
        if (queryValue) {
            document.querySelector('[name=\'search\']').value = queryValue;
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
     *
     * @param {*} event
     */
    selectHandle(event) {
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
     *
     */
    addEventListeners() {
        document.querySelector('#sort-select').addEventListener('change', this.selectHandle);
    }

    /**
     * подписка на события
     */
    subscribeToEvents() {
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

        const header = new Header();
        header.render();

        this.subscribeToEvents();
        this.addEventListeners();
    }
}
