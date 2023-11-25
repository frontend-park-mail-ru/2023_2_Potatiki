import './csat-form.scss';
import Button from '../button/button.js';
import template from './csat-form.hbs';
import router from '../../modules/router.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {mainRoute} from '../../config/urls.js';
import {reviewForm} from '../../config/components.js';
import StarsInput from '../starsInput/stars-input.js';

/**
 * Класс компонента формы отзыва
 */
export default class CsatForm {
    #parent;
    #config;
    #data;
    #questions;
    #currentQuestionIndex;

    starsInput;
    submit;
    closeButton;

    /**
     * Конструктор
     * @param {Element} parent Родительский элемент
     */
    constructor(parent, name) {
        this.#parent = parent;
        // this.#data = data;
        this.#config = reviewForm;
        this.#config.name = name;
        // this.#config.productName = this.#data.productName;
        this.#currentQuestionIndex = 0;
        this.#questions = [
            {
                id: 1,
                name: 'Оцените доставку',
            },
            {
                id: 2,
                name: 'Оцените дизайн',
            },
            {
                id: 3,
                name: 'Оцените холодильники',
            },
            {
                id: 4,
                name: 'Оцените кофе',
            },
        ];
    }

    get self() {
        return document.getElementById('csat-form');
    }

    /**
     * Функция обаботки отправки формы
     * @param {Event} event
     */
    submitHandle = (event) => {
        event.preventDefault();
        // UserActions.signup(
        //     this.login.self.value,
        //     this.password.self.value,
        //     this.repeatPassword.self.value,
        //     this.phone.self.value,
        // );
        console.log('csat-submit');
        const rate = this.starsInput.rate;
        console.log(this.#currentQuestionIndex, ' ', rate);
        if (!rate) {
            this.starsInput.renderError('Выберете рейтинг от 1 до 5');
            return;
        }
        if (this.#currentQuestionIndex === this.#questions.length - 1) {
            return;
        }
        this.nextQuestion();
    };

    nextQuestion() {
        this.self.querySelector('.csat-form__input-place').innerHTML = '';
        this.starsInput = new StarsInput(
            this.self.querySelector('.csat-form__input-place'),
            'csat',
            this.#questions[this.#currentQuestionIndex].name,
        );
        this.starsInput.render();
        this.#currentQuestionIndex++;
    }


    /**
     * Функция вызова валидации для поля логина
     * @param {Event} event
     */
    inputAdvantagesHandle(event) {
        event.preventDefault();
        // UserActions.validateLogin(this.login.self.value);
    }

    // inputLoginHandle = this.inputLoginHandle.bind(this);

    /**
     * Функция вызова валидации для поля пароля
     * @param {Event} event
     */
    inputDisadvantagesHandle(event) {
        event.preventDefault();
        // UserActions.validatePassword(this.password.self.value);
    }

    // inputPasswordHandle = this.inputPasswordHandle.bind(this);

    /**
     * Функция вызова валидации для поля повторить пароль
     * @param {Event} event
     */
    inputCommentsHandle(event) {
        event.preventDefault();
        // UserActions.validateRepeatPassword(this.password.self.value,
        //     this.repeatPassword.self.value);
    }

    // inputRepeatPasswordHandle = this.inputRepeatPasswordHandle.bind(this);

    /**
     * Редирект на главную страницу
     */
    redirectOnMain() {
        router.go({url: mainRoute});
    }

    /**
     * Отрисовка ошибки поля логина
     * @param {String} errorText Текст ошибки
     */
    renderLoginError(errorText) {
        this.login.removeError();
        this.login.renderError(errorText);
    }

    renderLoginError = this.renderLoginError.bind(this);

    /**
     *  Отрисовка ошибки поля пароль
     * @param {String} errorText Текст ошибки
     */
    renderPasswordError(errorText) {
        this.password.removeError();
        this.password.renderError(errorText);
    }

    renderPasswordError = this.renderPasswordError.bind(this);

    /**
     * Отрисовка ошибки поля повторить пароль
     * @param {String} errorText Текст ошибки
     */
    renderRepeatPasswordError(errorText) {
        this.repeatPassword.removeError();
        this.repeatPassword.renderError(errorText);
    }

    renderRepeatPasswordError = this.renderRepeatPasswordError.bind(this);


    /**
     * Отрисовка ошибки в форме
     * @param {String} error Текст ошибки
     */
    renderError(error) {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        errorDiv.textContent = error;
    }

    /**
     * Удаление ошибки с формы
     */
    removeError() {
        const errorDiv = document.querySelector(`#${this.#config.errorId}`);
        errorDiv.textContent = '';
    }

    removeSelf() {
        this.unsubscribeToEvents();
        this.removeListeners();
        this.self.remove();
    }

    submitHandle = this.submitHandle.bind(this);
    inputAdvantagesHandle = this.inputAdvantagesHandle.bind(this);
    inputDisadvantagesHandle = this.inputDisadvantagesHandle.bind(this);
    inputCommentsHandle = this.inputCommentsHandle.bind(this);
    renderError = this.renderError.bind(this);
    removeError = this.removeError.bind(this);
    removeSelf = this.removeSelf.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
     * Добавление листенеров
     */
    addListeners() {
        this.submit.self.addEventListener('click', this.submitHandle);
        // this.advantages.self.addEventListener('focusout', this.inputLoginHandle);
        // this.disadvantages.self.addEventListener('focusout', this.inputPasswordHandle);
        // this.comments.self.addEventListener('focusout', this.inputRepeatPasswordHandle);
        this.closeButton.self.addEventListener('click', this.removeSelf);
    }

    /**
     * Удаление прослушивателей событий
     */
    removeListeners() {
        this.submit.self.removeEventListener('click', this.submitHandle);
        // this.advantages.self.removeEventListener('focusout', this.inputLoginHandle);
        // this.disadvantages.self.removeEventListener('focusout', this.inputPasswordHandle);
        // this.comments.self.removeEventListener('focusout', this.inputRepeatPasswordHandle);
        this.closeButton.self.removeEventListener('click', this.removeSelf);
    }

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.SIGNUP_FORM_ERROR, this.renderError);
        eventEmmiter.subscribe(Events.SUCCESSFUL_SIGNUP, this.redirectOnMain);
        eventEmmiter.subscribe(Events.LOGIN_INPUT_ERROR, this.renderLoginError);
        eventEmmiter.subscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.subscribe(Events.REPEAT_PASSWORD_INPUT_ERROR, this.renderRepeatPasswordError);
        eventEmmiter.subscribe(Events.PHONE_INPUT_ERROR, this.renderPhoneError);

        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отписк аот событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.SIGNUP_FORM_ERROR, this.renderError);
        eventEmmiter.unsubscribe(Events.SUCCESSFUL_SIGNUP, this.redirectOnMain);
        eventEmmiter.unsubscribe(Events.LOGIN_INPUT_ERROR, this.renderLoginError);
        eventEmmiter.unsubscribe(Events.PASSWORD_INPUT_ERROR, this.renderPasswordError);
        eventEmmiter.unsubscribe(Events.REPEAT_PASSWORD_INPUT_ERROR,
            this.renderRepeatPasswordError);
        eventEmmiter.unsubscribe(Events.PHONE_INPUT_ERROR, this.renderPhoneError);

        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     * Отрисовка компонента формы регистрации
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );


        this.submit = new Button(this.self, this.#config.submit);
        this.submit.render();

        this.closeButton = new Button(
            this.self,
            this.#config.close,
            true,
        );
        this.closeButton.render();

        this.nextQuestion();

        this.addListeners();
        this.subscribeToEvents();
    }
}
