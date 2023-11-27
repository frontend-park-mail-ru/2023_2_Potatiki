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
import Link from '../../components/link/link.js';

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
            // id: `review-card-${data.profileName}`,
            id: `review-card-1`,
            data: data,
            // profileName: data.profileName,
            profileName: 'Иванов Петя',
            advantages: data.pros,
            disadvantages: data.cons,
            comments: data.comment,
            date: '23 ноября 2023',
            img: {
                imgSrc: '/static/images/user.svg',
                imgClass: 'review-card__img',
            },
            rate: data.rating,
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
            this.self.querySelector('.reviews-page__empty-review').textContent = 'Отзывов не найдено';
            return;
        }
        body.forEach((element) => {
            this.renderReview(element);
        });
    }

    renderReview(data) {
        if (!this.self.querySelector('.review-card')) {
            this.self.querySelector('.reviews-page__empty-review').remove();
        }
        const review = new Review(
            this.self.querySelector(
                '.reviews-page__reviews-container'),
            this.getReviewsConfig(data),
        );
        review.render();
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

    renderReview = this.renderReview.bind(this);
    saveProduct = this.saveProduct.bind(this);
    renderReviewForm = this.renderReviewForm.bind(this);
    redirectToNotFound = this.redirectToNotFound.bind(this);
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
        eventEmmiter.subscribe(Events.SUCCESSFUL_REVIEW, this.renderReview);
        // eventEmmiter.subscribe(Events.PRODUCT, this.updateProductInfo);
    }

    /**
    * Отриска от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCT, this.saveProduct);
        eventEmmiter.unsubscribe(Events.NOT_FOUND, this.redirectToNotFound);
        eventEmmiter.unsubscribe(Events.REVIEWS, this.renderReviews);
        eventEmmiter.unsubscribe(Events.REVIEW_FORM, this.renderReviewForm);
        eventEmmiter.unsubscribe(Events.SUCCESSFUL_REVIEW, this.renderReview);
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

        const backLink = new Link(
            this.self.querySelector('.reviews-page__back-link-place'),
            {
                text: 'К описанию товара',
                href: productRoute + '/' + this.#productId,
                class: 'reviews-page__back-link',
                imgClass: 'reviews-page__back-link-img',
                imgSrc: '/static/images/arrow-left-black.svg',
            },
        );

        backLink.render();

        const productInfo = new ReviewProduct(
            this.self.querySelector('.reviews-page__product-container'),
            this.#productId,
        );
        productInfo.render();

        const reviewSummary = new ReviewsSummary(
            this.self.querySelector('.reviews-page__summary-container'),
            this.#productId,
        );

        reviewSummary.render();

        ProductsActions.getReviews(this.#productId);
    }
}
