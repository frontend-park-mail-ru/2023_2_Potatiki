import header from '../../components/header/header.js';
import template from './category-page.hbs';
import {config} from '../../../config.js';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import CartProduct from '../../components/cartProduct/cart-product.js';
import './category-page.css';
import CategoryProduct from '../../components/category-product/category-product.js';
import {ProductsActions} from '../../actions/products.js';
import router from '../../modules/router.js';
import {notFoundRoute, productRoute} from '../../config/urls.js';

/**
 * Класс главной страницы
 */
export default class CategoryPage {
    #parent;

    #config;

    #categoryName;

    #categoryId;

    loadedProducts;

    endOfPage;

    timer;

    productsPerRequest;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent, params) {
        this.#parent = parent;
        this.#config = config.mainPage;
        this.endOfPage = false;
        this.timer = null;
        this.#categoryId = params.idParam;
        // this.#categoryName = params.nameParam;
        this.productsPerRequest = 5;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.querySelector('#category-page');
    }

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
            reviewsCount: `${0} отзывов`,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    updateCategoryName(name) {
        this.self.querySelector('.page-title').textContent = name;
    }

    renderProducts(body) {
        if (!body) {
            eventEmmiter.unsubscribe(Events.PRODUCTS, this.renderProducts);
            this.endOfPage = true;
            return;
        }
        body.forEach((element) => {
            const product = new CategoryProduct(this.self.querySelector('.category-products-container'), this.getConfig(element));
            product.render();
        });
    }

    checkPosition() {
        if (this.timer) return;

        this.timer = setTimeout(() => {
            const height = document.body.offsetHeight;
            const screenHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const threshold = height - screenHeight / 3;
            const position = scrolled + screenHeight;
            if (this.endOfPage) {
                this.removeListeners();
            }
            if (position >= threshold) {
                ProductsActions.getCategoryProducts(this.loadedProducts, this.productsPerRequest, this.#categoryId);
                this.loadedProducts += this.productsPerRequest;
            }
            clearTimeout(this.timer);
            this.timer = null;
        }, 250);
    }

    redirectToNotFound() {
        router.go({url: notFoundRoute});
    }

    redirectToNotFound = this.redirectToNotFound.bind(this);
    checkPosition = this.checkPosition.bind(this);
    renderProducts = this.renderProducts.bind(this);
    updateCategoryName = this.updateCategoryName.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.subscribe(Events.CATEGORY_PRODUCTS, this.renderProducts);
        eventEmmiter.subscribe(Events.CATEGORY_NAME, this.updateCategoryName);
    }

    addListeners() {
        window.addEventListener('scroll', this.checkPosition);
        window.addEventListener('resize', this.checkPosition);
    }

    /**
    *
    */
    removeListeners() {
        window.removeEventListener('scroll', this.checkPosition);
        window.removeEventListener('resize', this.checkPosition);
    }

    /**
    *
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CATEGORY_PRODUCTS, this.renderProducts);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.unsubscribe(Events.CATEGORY_NAME, this.updateCategoryName);
    }

    /**
    * Отрисовка страницы регистрации
    */
    render() {
        this.#parent.innerHTML = template({category: this.#categoryName});

        header.render();
        this.subscribeToEvents();
        this.loadedProducts = 0;
        ProductsActions.getCategoryProducts(this.loadedProducts, this.productsPerRequest, this.#categoryId);
        ProductsActions.getCategoryName(this.#categoryId);
        this.loadedProducts += this.productsPerRequest;
        this.addListeners();
    }
}
