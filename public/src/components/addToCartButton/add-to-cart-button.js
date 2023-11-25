import './add-to-cart-button.scss';
import Button from '../button/button.js';
import template from './add-to-cart-button.hbs';
import {CartActions} from '../../actions/cart.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import CountManagement from '../countManagement/count-management.js';

/**
<<<<<<< HEAD
 * Класс кнопки добавления в корзину
 */
export default class AddToCartButton {
    #parent;
    #data;
    #parentId;
    #elClass;

    button;
    management;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   * @param {Object} data Данные о товаре, которому принадлежит кнопка
   * @param {String} parentId Id карточки товара
   * @param {String} elClass Класс кнопки
=======
 * Класс формы авторизации
 */
export default class AddToCartButton {
    #parent;

    #data;

    #parentId;

    button;

    management;

    #elClass;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
>>>>>>> origin/main
   */
    constructor(parent, data, parentId, elClass) {
        this.#parent = parent;
        this.#data = data;
        this.#parentId = parentId;
        this.#elClass = elClass;
    }

    /**
<<<<<<< HEAD
     * Взятие элемента кнопки
     */
    get self() {
        return document.querySelector(
            `#add-to-cart-item-${this.#parentId}-${this.#data.productId}`);
    }

    /**
     * Функция, возвращающая конфинг для компонента кнопки для добавления в корзину
     * @return {String} Конфига для компонента кнопки
     */
=======
     *
     */
    get self() {
        return document.querySelector(`#add-to-cart-item-${this.#parentId}-${this.#data.productId}`);
    }

>>>>>>> origin/main
    getButtonConfig() {
        return {
            id: `add-to-cart-btn-${this.#parentId}-${this.#data.productId}`,
            data: this.#data.productId,
            class: 'product-card__button_size_in-cart',
            type: 'button',
            text: 'В корзину',
            imgSrc: '/static/images/cart.svg',
        };
    }

<<<<<<< HEAD
    /**
     * Обновление количества товаров, добавленных в корзину
     * @param {Object} data
     */
=======
>>>>>>> origin/main
    updateManagement(data) {
        if (data.productId !== this.#data.productId || !this.self) {
            return;
        }
        if (!this.management) {
            this.renderCountManagement(data);
        }
        this.#data.quantity = data.quantity;
        this.management.count.textContent = this.#data.quantity;
    }

<<<<<<< HEAD
    /**
     * Отрисовка кнопки
     * @param {Object} data ?
     */
=======
>>>>>>> origin/main
    renderButton(data) {
        if (data.productId !== this.#data.productId || !this.self) {
            return;
        }
        if (this.management) {
            this.management.left?.removeEventListener('click', this.decreaseQuantity);
            this.management.right?.removeEventListener('click', this.increaseQuantity);
            this.management = undefined;
        }
        this.self.innerHTML = '';
        this.#data.quantity = 0;
        this.button = new Button(this.self, this.getButtonConfig());
        this.button.render();
        this.button.self.addEventListener('click', this.addToCart);
    }

<<<<<<< HEAD
    /**
     * Взятия конфига для отрисовки компонента числа добавленных товаров
     * @param {Number} quantity Количество товара
     * @return {String} Конфиг
     */
=======
>>>>>>> origin/main
    getManagmentConfig(quantity) {
        return {
            id: `${this.#parentId}-count-management-${this.#data.productId}`,
            class: 'count-management__big',
            quantity: quantity,
            minus: {
                id: `minus-${this.#data.productId}`,
                class: 'count-management__button',
                imgClass: 'count-management__img',
                imgSrc: '/static/images/' + 'minus.svg',
            },
            plus: {
                id: `plus-${this.#data.productId}`,
                imgSrc: '/static/images/' + 'plus.svg',
                imgClass: 'count-management__img',
                class: 'count-management__button count-management__button-right',
            },
        };
    }

<<<<<<< HEAD
    /**
     * Отрисовака компонента подсчета количества товара
     * @param {Object} data Данные для отрисовки
     */
=======
>>>>>>> origin/main
    renderCountManagement(data) {
        if (data.productId !== this.#data.productId || !this.self) {
            return;
        }
        if (this.button) {
            this.button?.self.removeEventListener('click', this.addToCart);
            this.button = undefined;
        }
        this.self.innerHTML = '';
        this.management = new CountManagement(this.self, this.getManagmentConfig(data.quantity));
        this.management.render();
        this.management.left.addEventListener('click', this.decreaseQuantity);
        this.management.right.addEventListener('click', this.increaseQuantity);
    }

<<<<<<< HEAD
    /**
     * Добавление товара в корзину
     * @param {Event} event Событие, вызывающее добавление в корзину
     */
=======
>>>>>>> origin/main
    addToCart(event) {
        event.preventDefault();
        CartActions.addProductLocal(this.#data);
    }

<<<<<<< HEAD
    /**
     * Уменьшение количества товара
     * @param {Event} event Событие, вызывающее уменьшение количества
     */
=======
>>>>>>> origin/main
    decreaseQuantity(event) {
        event.preventDefault();
        CartActions.changeQuantityLocal(this.#data, true);
    }

<<<<<<< HEAD
    /**
     * Увеличение количества товара
     * @param {Event} event Событие, вызывающее увлечение количества
     */
=======
>>>>>>> origin/main
    increaseQuantity(event) {
        event.preventDefault();
        CartActions.changeQuantityLocal(this.#data);
    }


    addToCart = this.addToCart.bind(this);
    decreaseQuantity = this.decreaseQuantity.bind(this);
    increaseQuantity = this.increaseQuantity.bind(this);
    updateManagement = this.updateManagement.bind(this);
    renderButton = this.renderButton.bind(this);
    renderCountManagement = this.renderCountManagement.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
<<<<<<< HEAD
     * Подписка на события
=======
     *
>>>>>>> origin/main
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.DEL_PRODUCT_SUCCESS, this.renderButton);
        eventEmmiter.subscribe(Events.ADD_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.subscribe(Events.CHG_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
<<<<<<< HEAD
     * Отписка от событий
=======
     *
>>>>>>> origin/main
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.DEL_PRODUCT_SUCCESS, this.renderButton);
        eventEmmiter.unsubscribe(Events.ADD_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.unsubscribe(Events.CHG_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
<<<<<<< HEAD
     * Удаление листенеров
=======
     *
>>>>>>> origin/main
     */
    removeListeners() {
        if (this.management) {
            this.management.left.removeEventListener('click', this.decreaseQuantity);
            this.management.right.removeEventListener('click', this.increaseQuantity);
            return;
        }
        this.button.self.removeEventListener('click', this.addToCart);
    }

    /**
<<<<<<< HEAD
     * Отрисовка компонента
     */
=======
   * Отрисовка компонента
   */
>>>>>>> origin/main
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template({id: this.#data.productId, parentId: this.#parentId, class: this.#elClass}),
        );

        if (this.#data.quantity) {
            this.renderCountManagement(this.#data);
        } else {
            this.renderButton(this.#data);
        }

        this.subscribeToEvents();
    }
}
