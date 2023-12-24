import './reviews-summary.scss';
import template from './reviews-summary.hbs';
import Button from '../button/button';
import {eventEmmiter} from '../../modules/event-emmiter';
import {Events} from '../../config/events';
import {UserActions} from '../../actions/user';
import {ProductsActions} from '../../actions/products';
import {rateCase} from '../../modules/utils';
import RateRow from '../rateRow/rate-row';
import {loginRoute} from '../../config/urls';
import Link from '../link/link';

/**
 * Класс компонента информации об отзывах
 */
export default class ReviewsSummary {
    #parent;

    #isAfterBegin;

    #productId;

    #createReviewButton;

    #rateRows;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский компонент
     * @param {String} productId id продукта
     * @param {Boolean} isAfterBegin Флаг о месте отрисовки элемента
     */
    constructor(parent, productId, isAfterBegin) {
        this.#parent = parent;
        this.#productId = productId;
        this.#isAfterBegin = isAfterBegin;
        this.#rateRows = [];
    }

    /**
     *
     */
    get self() {
        return document.querySelector('.reviews-summary');
    }

    /**
     * Обновление информации о рейтинге
     * @param {Object} data Данные о рейтинге
     */
    updateRateInfo(data) {
        if (!data || !data.rate || !data.count) {
            return;
        }
        const reviewsCount = `${data.count} ${rateCase(data.count)}`;
        this.self.querySelector('.reviews-summary__count').textContent = reviewsCount;
        this.self.querySelector('.reviews-summary__rate').textContent = data.rate + ' / 5';
        if (this.self.querySelector('.reviews-summary__body').innerHTML) {
            this.#rateRows.forEach((rRow, index) => {
                rRow.setNewCount(data.rows[4 - index]);
            });
            return;
        }
        data.rows.reverse().forEach((row, index) => {
            const rateRow = new RateRow(
                this.self.querySelector('.reviews-summary__body'),
                5 - index,
                'summary-row-' + index,
                row,
            );
            rateRow.render();
            this.#rateRows.push(rateRow);
        });
    }

    /**
     * Получение формы отзыва
     */
    getReviewForm() {
        ProductsActions.getReviewForm(this.#productId);
    }

    /**
     * Отрисовка кнопки создания отзыва
     */
    renderCreateButton() {
        this.self.querySelector('.reviews-summary__button-place').innerHTML = '';
        this.#createReviewButton = new Button(
            this.self.querySelector('.reviews-summary__button-place'),
            {
                id: 'create-review-btn',
                text: 'Оставить отзыв',
            },
            true,
        );
        this.#createReviewButton.render();
        this.addListeners();
    }

    renderCreateButton = this.renderCreateButton.bind(this);
    getReviewForm = this.getReviewForm.bind(this);
    updateRateInfo = this.updateRateInfo.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PAGE_ALLOWED, this.renderCreateButton);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.REVIEWS_SUMMARY, this.updateRateInfo);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PAGE_ALLOWED, this.renderCreateButton);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.REVIEWS_SUMMARY, this.updateRateInfo);
    }

    /**
     * Добавление лисенеров
     */
    addListeners() {
        this.#createReviewButton.self.addEventListener('click', this.getReviewForm);
    }

    /**
     * Удаление лисенеров
     */
    removeListeners() {
        this.#createReviewButton.self.removeEventListener('click', this.getReviewForm);
    }

    /**
   * Отрисовка компонента
   */
    render() {
        const destination = this.#isAfterBegin ? 'afterbegin' : 'beforeend';
        this.#parent.insertAdjacentHTML(
            destination,
            template(),
        );

        this.#createReviewButton = new Link(
            this.self.querySelector('.reviews-summary__button-place'),
            {
                id: 'create-review-btn',
                text: 'Авторизуйтесь, чтобы оставить отзыв',
                href: loginRoute,
                class: 'reviews-summary__login-link',
            },
            true,
        );
        this.#createReviewButton.render();

        this.subscribeToEvents();
        UserActions.checkAuth();
    }
}
