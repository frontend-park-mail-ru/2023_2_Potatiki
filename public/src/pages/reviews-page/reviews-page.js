import Header from '../../components/header/header.js';
import template from './reviews-page.hbs';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import './reviews-page.scss';
import {ProductsActions} from '../../actions/products.js';
import router from '../../modules/router.js';
import {notFoundRoute, productRoute} from '../../config/urls.js';
import ReviewProduct from '../../components/reviewProduct/review-product.js';
import ReviewsSummary from '../../components/reviewsSummary/reviews-summary.js';
import ReviewForm from '../../components/reviewForm/review-form.js';
import Review from '../../components/review/review.js';
import CsatForm from '../../components/csatForm/csat-form.js';

/**
 * Класс страницы товаров категории
 */
export default class ReviewsPage {
    #parent;
    #categoryName;
    #productId;
    #productData;

    loadedReviews;
    endOfPage;
    timer;
    reviewsPerRequest;
    reviewForm;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} params Данные о категории страницы
   */
    constructor(parent, params) {
        this.#parent = parent;
        this.endOfPage = false;
        this.timer = null;
        this.#productId = params.idParam;
        this.reviewsPerRequest = 5;
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.getElementById('reviews-page');
    }

    /**
     * Взятие конфига для отображения карточки отзыва
     * @param {Object} data Данные для создания конфига
     * @return {Object} Конфиг
     */
    getReviewsConfig(data) {
        return {
            id: `review-card-${data.profileName}`,
            data: data,
            profileName: data.profileName,
            advantages: data.advantages,
            disadvantages: data.disadvantages,
            comments: data.comments,
            date: data.date,
            img: {
                imgSrc: '/static/images/' + data.img,
                imgClass: 'category-card__img',
                href: productRoute + '/' + data.productId,
            },
            rate: data.rate,
        };
    }

    // /**
    //  * Изменение названия категории
    //  * @param {String} name Новое название
    //  */
    // updateProductInfo(name) {
    //     this.self.querySelector('.page-title').textContent = name;
    // }

    saveProduct(data) {
        this.#productData = data;
    }

    /**
     * Отображение продуктов категории
     * @param {Object} body Данные о продуктах категории
     */
    renderReviews(body) {
        if (!body || !body.length) {
            eventEmmiter.unsubscribe(Events.PRODUCTS, this.renderReviews);
            this.endOfPage = true;
            return;
        }
        body.forEach((element) => {
            // const product = new Review(
            //     this.self.querySelector('.reviews-container'), this.getReviewsConfig(element));
            // product.render();
        });
        this.loadedReviews += this.reviewsPerRequest;
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
            if (this.endOfPage) {
                this.removeListeners();
                return;
            }
            if (position >= threshold) {
                // ProductsActions.getReviews(
                //     this.loadedReviews, this.reviewsPerRequest, this.#productId);
            }
            clearTimeout(this.timer);
            this.timer = null;
        }, 250);
    }

    renderReviewForm() {
        console.log('render form');
        if (this.reviewForm?.self) {
            return;
        }
        this.reviewForm = new ReviewForm(this.#parent, this.#productData);
        this.reviewForm.render();
    }

    /**
     * Редирект на страницу не найдено
     */
    redirectToNotFound() {
        router.go({url: notFoundRoute});
    }

    saveProduct = this.saveProduct.bind(this);
    renderReviewForm = this.renderReviewForm.bind(this);
    redirectToNotFound = this.redirectToNotFound.bind(this);
    checkPosition = this.checkPosition.bind(this);
    renderReviews = this.renderReviews.bind(this);
    // updateProductInfo = this.updateProductInfo.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PRODUCT, this.saveProduct);
        eventEmmiter.subscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.subscribe(Events.REVIEWS, this.renderReviews);
        eventEmmiter.subscribe(Events.REVIEW_FORM, this.renderReviewForm);

        // eventEmmiter.subscribe(Events.PRODUCT, this.updateProductInfo);
    }

    /**
     * Добавление листенеров
     */
    addListeners() {
        window.addEventListener('scroll', this.checkPosition);
        window.addEventListener('resize', this.checkPosition);
    }

    /**
    * Удаление листенеров
    */
    removeListeners() {
        window.removeEventListener('scroll', this.checkPosition);
        window.removeEventListener('resize', this.checkPosition);
    }

    /**
    * Отриска от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCT, this.saveProduct);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.unsubscribe(Events.REVIEWS, this.renderReviews);
        eventEmmiter.unsubscribe(Events.REVIEW_FORM, this.renderReviewForm);

        // eventEmmiter.unsubscribe(Events.PRODUCT, this.updateProductInfo);
    }

    /**
    * Отрисовка страницы продуктов категории
    */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header();
        header.render();
        this.subscribeToEvents();

        const productInfo = new ReviewProduct(
            this.self.querySelector('.reviews-page__product-container'),
            this.#productId,
        );
        productInfo.render();

        const reviewSummary = new ReviewsSummary(
            this.self.querySelector('.reviews-page__reviews-container'),
            this.#productId,
        );

        reviewSummary.render();

        const csatForm = new CsatForm(this.self, 'Оцените наш сайт');
        csatForm.render();


        this.loadedReviews = 0;
        ProductsActions.getReviews(this.loadedReviews,
            this.reviewsPerRequest, this.#productId);

        this.addListeners();
    }
}
