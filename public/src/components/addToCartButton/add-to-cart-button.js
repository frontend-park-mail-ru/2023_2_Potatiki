import Button from '../button/button.js';
import template from './add-to-cart-button.hbs';
import {CartActions} from '../../actions/cart.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import CountManagement from '../countManagement/count-management.js';

/**
 * Класс формы авторизации
 */
export default class AddToCartButton {
    #parent;

    #data;

    #parentId;

    button;

    management;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский компонент
   */
    constructor(parent, data, parentId, quantity) {
        this.#parent = parent;
        this.#data = data;
        this.#parentId = parentId;
    }

    /**
     *
     */
    get self() {
        return document.querySelector(`#add-to-cart-item-${this.#parentId}-${this.#data.id}`);
    }

    getButtonConfig() {
        return {
            id: `add-to-cart-btn-${this.#parentId}-${this.#data.id}`,
            data: this.#data.id,
            class: 'product-card__button_size_in-cart',
            type: 'button',
            text: 'В корзину',
            imgSrc: './static/images/cart.svg',
        };
    }

    updateManagement(data) {
        if (data.id !== this.#data.id || !this.self) {
            return;
        }
        if (!this.management) {
            this.renderCountManagement(data);
        }
        this.#data.quantity = data.quantity;
        this.management.count.textContent = this.#data.quantity;
    }

    renderButton(data) {
        if (data.id !== this.#data.id || !this.self) {
            return;
        }
        if (this.self.innerHTML) {
            this.management.left.removeEventListener('click', this.decreaseQuantity);
            this.management.right.removeEventListener('click', this.increaseQuantity);
            this.management = undefined;
        }
        this.self.innerHTML = '';
        this.#data.quantity = 0;
        this.button = new Button(this.self, this.getButtonConfig());
        this.button.render();
        this.button.self.addEventListener('click', this.addToCart);
    }

    getManagmentConfig(quantity) {
        return {
            id: `${this.#parentId}-count-management-${this.#data.id}`,
            class: 'count-management__big',
            quantity: quantity,
            minus: {
                id: `minus-${this.#data.id}`,
                class: 'count-management__button',
                imgClass: 'count-management__img',
                imgSrc: './static/images/' + 'minus.svg',
            },
            plus: {
                id: `plus-${this.#data.id}`,
                imgSrc: './static/images/' + 'plus.svg',
                imgClass: 'count-management__img',
                class: 'count-management__button count-management__button-right',
            },
        };
    }

    renderCountManagement(data) {
        if (data.id !== this.#data.id || !this.self) {
            return;
        }
        if (this.self.innerHTML) {
            this.button.self.removeEventListener('click', this.addToCart);
        }
        this.self.innerHTML = '';
        this.management = new CountManagement(this.self, this.getManagmentConfig(data.quantity));
        this.management.render();
        this.management.left.addEventListener('click', this.decreaseQuantity);
        this.management.right.addEventListener('click', this.increaseQuantity);
    }

    addToCart(event) {
        event.preventDefault();
        CartActions.addProductLocal(this.#data);
    }

    decreaseQuantity(event) {
        event.preventDefault();
        CartActions.changeQuantityLocal(this.#data, true);
    }

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
     *
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.DEL_PRODUCT_SUCCESS, this.renderButton);
        eventEmmiter.subscribe(Events.ADD_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.subscribe(Events.CHG_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     *
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.DEL_PRODUCT_SUCCESS, this.renderButton);
        eventEmmiter.unsubscribe(Events.ADD_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.unsubscribe(Events.CHG_PRODUCT_SUCCESS, this.updateManagement);
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    /**
     *
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
   * Отрисовка компонента
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template({id: this.#data.id, parentId: this.#parentId}),
        );

        if (this.#data.quantity) {
            this.renderCountManagement(this.#data);
        } else {
            this.renderButton(this.#data);
        }

        this.subscribeToEvents();
    }
}
