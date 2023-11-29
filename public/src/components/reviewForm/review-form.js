import './review-form.scss';
import Button from '../button/button.js';
import template from './review-form.hbs';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {reviewRoute} from '../../config/urls.js';
import {advantagesName,
    commentsName,
    disadvantagesName,
    reviewForm} from '../../config/components.js';
import StarsInput from '../starsInput/stars-input.js';
import Textarea from '../textarea/textarea.js';
import {ProductsActions} from '../../actions/products.js';

/**
 * Класс компонента формы отзыва
 */
export default class ReviewForm {
    #parent;
    #config;
    #data;

    starsInput;
    advantages;
    disadvantages;
    comments;
    submit;
    closeButton;

    /**
     * Конструктор
     * @param {Element} parent Родительский элемент
     * @param {Element} data Информация о продукте
     */
    constructor(parent, data) {
        this.#parent = parent;
        this.#data = data;
        this.#config = reviewForm;
        this.#config.productName = this.#data.productName;
    }

    /** */
    get self() {
        return document.querySelector('.review-form__container');
    }

    /**
     * Функция обаботки отправки формы
     * @param {Event} event
     */
    submitHandle = (event) => {
        event.preventDefault();

        const rate = this.starsInput.rate;
        if (!rate) {
            this.starsInput.renderError('Выберете рейтинг от 1 до 5');
            return;
        }
        ProductsActions.createReview(
            this.#data.productId,
            this.advantages.self.value,
            this.disadvantages.self.value,
            this.comments.self.value,
            rate,
        );
    };


    /**
     * Функция вызова валидации для достоинств
     * @param {Event} event
     */
    inputAdvantagesHandle(event) {
        event.preventDefault();
        ProductsActions.validateReviewInput(this.advantages.self.value, advantagesName);
    }

    /**
     * Функция вызова валидации для поля недостатков
     * @param {Event} event
     */
    inputDisadvantagesHandle(event) {
        event.preventDefault();
        ProductsActions.validateReviewInput(this.disadvantages.self.value, disadvantagesName);
    }

    /**
     * Функция вызова валидации для поля комментариев
     * @param {Event} event
     */
    inputCommentsHandle(event) {
        event.preventDefault();
        ProductsActions.validateReviewInput(this.comments.self.value, commentsName);
    }

    /**
     * Отрисовка ошибки поля
     * @param {String} errorText Текст ошибки
     * @param {String} inputName Название поля
     */
    renderInputError(errorText, inputName) {
        switch (inputName) {
        case commentsName:
            this.comments.removeError();
            this.comments.renderError(errorText);
            break;
        case disadvantagesName:
            this.disadvantages.removeError();
            this.disadvantages.renderError(errorText);
            break;
        case advantagesName:
            this.advantages.removeError();
            this.advantages.renderError(errorText);
            break;
        }
    }

    /**
     * Удаление ошибки поля
     * @param {String} inputName Название поля
     */
    removeInputError(inputName) {
        switch (inputName) {
        case commentsName:
            this.comments.removeError();
            break;
        case disadvantagesName:
            this.disadvantages.removeError();
            break;
        case advantagesName:
            this.advantages.removeError();
            break;
        }
    }

    /**
     * Скрытие формы
     */
    removeSelf() {
        this.unsubscribeToEvents();
        this.removeListeners();
        document.getElementById('review-form').remove();
        ProductsActions.onScroll();
    }

    removeInputError = this.removeInputError.bind(this);
    renderInputError = this.renderInputError.bind(this);
    submitHandle = this.submitHandle.bind(this);
    inputAdvantagesHandle = this.inputAdvantagesHandle.bind(this);
    inputDisadvantagesHandle = this.inputDisadvantagesHandle.bind(this);
    inputCommentsHandle = this.inputCommentsHandle.bind(this);
    removeSelf = this.removeSelf.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
     * Добавление листенеров
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        this.advantages.self.addEventListener('focusout', this.inputAdvantagesHandle);
        this.disadvantages.self.addEventListener('focusout', this.inputDisadvantagesHandle);
        this.comments.self.addEventListener('focusout', this.inputCommentsHandle);
        this.closeButton.self.addEventListener('click', this.removeSelf);
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.submit.self.removeEventListener('click', this.submitHandle);
        this.advantages.self.removeEventListener('focusout', this.inputAdvantagesHandle);
        this.disadvantages.self.removeEventListener('focusout', this.inputDisadvantagesHandle);
        this.comments.self.removeEventListener('focusout', this.inputCommentsHandle);
        this.closeButton.self.removeEventListener('click', this.removeSelf);
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.REVIEW_INPUT_ERROR, this.renderInputError);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.SUCCESSFUL_REVIEW, this.removeSelf);
        eventEmmiter.subscribe(Events.REVIEW_EXIST, this.removeSelf);
        eventEmmiter.subscribe(Events.REVIEW_INPUT_OK, this.removeInputError);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.REVIEW_INPUT_ERROR, this.renderInputError);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.SUCCESSFUL_REVIEW, this.removeSelf);
        eventEmmiter.unsubscribe(Events.REVIEW_EXIST, this.removeSelf);
        eventEmmiter.unsubscribe(Events.REVIEW_INPUT_OK, this.removeInputError);
    }

    /**
     * Отрисовка компонента формы регистрации
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        this.starsInput = new StarsInput(
            this.self.querySelector('.review-form__stars-input'),
            'review-form-star-input',
            'Оцените продукт',
        );
        this.starsInput.render();

        this.advantages = new Textarea(
            this.self,
            this.#config.advantages,
        );
        this.advantages.render();

        this.disadvantages = new Textarea(
            this.self,
            this.#config.disadvantages,
        );
        this.disadvantages.render();

        this.comments = new Textarea(
            this.self,
            this.#config.comments,
        );
        this.comments.render();


        this.submit = new Button(this.self, this.#config.submit);
        this.submit.render();

        this.closeButton = new Button(
            this.self,
            this.#config.close,
            true,
        );
        this.closeButton.render();

        this.addListeners();
        this.subscribeToEvents();

        UserActions.getCSRFToken(reviewRoute);
    }
}
