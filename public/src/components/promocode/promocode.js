import Button from '../button/button.js';
import template from './promocode.hbs';
import './promocode.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {CartActions} from '../../actions/cart.js';
import Input from '../input/input.js';
import {promocodeInput} from '../../config/components.js';

/**
 * Класс компонента итога заказа
 */
export default class Promocode {
    #parent;
    #config;

    input;
    button;

    /**
     * Конструктор класса
     * @param {Element} parent Родительский элемент
     * @param {Object} config Конфиг отрисовки класса
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`.promocode`);
    }

    /**
     * Вязтие кнопки применения промокода
     */
    get button() {
        return this.self.querySelector(`#${this.#config.id}`);
    }

    /**
     * Применение промокода
     */
    applyPromo() {
        this.self.querySelector('.promocode__status').textContent = '';
        const promo = this.input.self.value.trim();
        console.log(promo);
        CartActions.applyPromo(promo);
    }

    /**
     * Отрисовка ошибки поля
     * @param {String} errorText Текст ошибки
     */
    renderInputError(errorText) {
        this.input.removeError();
        this.input.renderError(errorText);
    }

    /**
     * Удаление ошибки поля
     */
    removeInputError() {
        this.input.removeError();
    }
    /**
     * Удаление компонента
     */
    deleteSelf() {
        this.removeListeners();
        this.unsubscribeToEvents();
        this.self.remove();
        return;
    }

    /**
     * Изменение статуса применения промокода
     */
    promoApplied() {
        this.removeInputError();
        this.self.querySelector('.promocode__status').textContent = 'Промокод применен';
    }

    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    deleteSelf = this.deleteSelf.bind(this);
    applyPromo = this.applyPromo.bind(this);
    renderInputError = this.renderInputError.bind(this);
    removeInputError = this.removeInputError.bind(this);
    promoApplied = this.promoApplied.bind(this);


    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.subscribe(Events.PROMO_INPUT_ERROR, this.renderInputError);
        eventEmmiter.subscribe(Events.PROMO_APPLIED, this.promoApplied);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.PROMO_INPUT_ERROR, this.renderInputError);
        eventEmmiter.unsubscribe(Events.PROMO_APPLIED, this.promoApplied);
    }


    /**
     * Удаление листенеров
     */
    removeListeners() {
        this.button.self.removeEventListener('click', this.updateOrder);
        this.button.self.removeEventListener('click', this.serverMessage);
    }

    /**
     * Отрисовка компонента
     */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#config),
        );

        this.button = new Button(
            this.self.querySelector('.promocode__button'),
            this.#config,
            true,
        );

        this.button.render();
        this.button.self.addEventListener('click', this.applyPromo);

        this.input = new Input(
            this.self.querySelector('.promocode__input'),
            promocodeInput,
        );
        this.input.render();

        this.subscribeToEvents();
    }
}
