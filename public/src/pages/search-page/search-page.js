import {ProductsActions} from '../../actions/products';
import {Events} from '../../config/events';
import {eventEmmiter} from '../../modules/event-emmiter';
import template from './search-page.hbs';
import CategoryProduct from '../../components/category-product/category-product.js';
import {productRoute} from '../../config/urls';
import './search-page.scss';

/**
 * Класс страницы товаров поиска
 */
export default class SearchPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
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
            productRate: data.rating,
            reviewsCount: `0 отзывов`,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    /**
     * Отображение продуктов категории
     * @param {Object} body Данные о продуктах категории
     */
    renderProducts(body) {
        if (!body || !body.length) {
            return;
        }
        document.querySelector('.search-products-container').innerHTML = '';
        body.forEach((element) => {
            const product = new CategoryProduct(
                document.querySelector('.search-products-container'), this.getConfig(element));
            product.render();
        });
    }

    renderProducts = this.renderProducts.bind(this);

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
        this.subscribeToEvents();
    }
}
