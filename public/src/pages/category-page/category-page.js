import Header from '../../components/header/header.js';
import template from './category-page.hbs';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import './category-page.scss';
import CategoryProduct from '../../components/category-product/category-product.js';
import {ProductsActions} from '../../actions/products.js';
import router from '../../modules/router.js';
import {notFoundRoute, productRoute, reviewRoute} from '../../config/urls.js';
import {SORT_POPULAR} from '../../config/components.js';
import {rateCase} from '../../modules/utils.js';
import {UserActions} from '../../actions/user.js';


/**
 * Класс страницы товаров категории
 */
export default class CategoryPage {
    #parent;
    #categoryName;
    #categoryId;
    #sort;

    loadedProducts;
    endOfPage;
    timer;
    productsPerRequest;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} params Данные о категории страницы
   */
    constructor(parent, params) {
        this.#parent = parent;
        this.endOfPage = false;
        this.timer = null;
        this.#categoryId = params.idParam;
        this.productsPerRequest = 5;
        this.#sort = SORT_POPULAR;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('category-page');
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
            reviewsCount: data.countComments + ' ' + rateCase(data.countComments),
            reviewsHref: reviewRoute + '/' + data.productId,
            price: data.price.toLocaleString() + ' ₽',
        };
    }

    /**
     * Изменение названия категории
     * @param {String} name Новое название
     */
    updateCategoryName(name) {
        document.title = name;
        this.self.querySelector('.page-title').textContent = name;
    }

    /**
     * Обработка выбора сортровки
     * @param {Event} event
     */
    selectHandle(event) {
        this.endOfPage = false;
        this.loadedProducts = 0;
        eventEmmiter.subscribe(Events.PRODUCTS, this.renderProducts);
        this.#sort = document.querySelector('#sort-select').value;
        UserActions.localRemoveListeners();
        this.self.querySelector('.category-products-container').innerHTML = '';
        ProductsActions.getCategoryProducts(this.loadedProducts,
            this.productsPerRequest, this.#categoryId, this.#sort);
        this.loadedProducts += this.productsPerRequest;
    }

    selectHandle = this.selectHandle.bind(this);


    /**
     * Отображение продуктов категории
     * @param {Object} body Данные о продуктах категории
     */
    renderProducts(body) {
        if (!body || !body.length) {
            eventEmmiter.unsubscribe(Events.PRODUCTS, this.renderProducts);
            this.endOfPage = true;
            return;
        }
        body.forEach((element) => {
            const product = new CategoryProduct(
                this.self.querySelector('.category-products-container'), this.getConfig(element));
            product.render();
        });
    }

    /**
     * Проверка положение скролла и отображения новых продуктов, если он в конце
     */
    checkPosition() {
        if (this.timer) return;

        this.timer = setTimeout(() => {
            const height = document.body.offsetHeight;
            const screenHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const threshold = height - screenHeight / 3;
            const position = scrolled + screenHeight;
            if (position >= threshold && !this.endOfPage) {
                ProductsActions.getCategoryProducts(
                    this.loadedProducts, this.productsPerRequest, this.#categoryId, this.#sort);
                this.loadedProducts += this.productsPerRequest;
            }
            clearTimeout(this.timer);
            this.timer = null;
        }, 250);
    }

    /**
     * Редирект на страницу не найдено
     */
    redirectToNotFound() {
        router.go({url: notFoundRoute});
    }

    redirectToNotFound = this.redirectToNotFound.bind(this);
    checkPosition = this.checkPosition.bind(this);
    renderProducts = this.renderProducts.bind(this);
    updateCategoryName = this.updateCategoryName.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.subscribe(Events.CATEGORY_PRODUCTS, this.renderProducts);
        eventEmmiter.subscribe(Events.CATEGORY_NAME, this.updateCategoryName);
    }


    /**
     * Добавление листенеров
     */
    addListeners() {
        window.addEventListener('scroll', this.checkPosition);
        window.addEventListener('resize', this.checkPosition);
        document.querySelector('#sort-select').addEventListener('change', this.selectHandle);
    }

    /**
    * Удаление листенеров
    */
    removeListeners() {
        window.removeEventListener('scroll', this.checkPosition);
        window.removeEventListener('resize', this.checkPosition);
        document.querySelector('#sort-select').removeEventListener('change', this.selectHandle);
    }

    /**
    * Отриска от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.CATEGORY_PRODUCTS, this.renderProducts);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.unsubscribe(Events.CATEGORY_NAME, this.updateCategoryName);
    }

    /**
    * Отрисовка страницы продуктов категории
    */
    render() {
        this.#parent.innerHTML = template({category: this.#categoryName});

        const header = new Header();
        header.render();
        this.subscribeToEvents();
        this.loadedProducts = 0;
        ProductsActions.getCategoryProducts(this.loadedProducts,
            this.productsPerRequest, this.#categoryId, this.#sort);
        ProductsActions.getCategoryName(this.#categoryId);
        this.loadedProducts += this.productsPerRequest;
        this.addListeners();
    }
}
