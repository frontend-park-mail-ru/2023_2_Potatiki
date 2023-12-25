import template from './recommendations.hbs';
import './recommendations.scss';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import Carousel from '../carousel/carousel.js';
import {recCarousel} from '../../config/components.js';
import {ProductsActions} from '../../actions/products.js';

/**
 * Класс компонента рекоммендаций
 */
export default class Recommendations {
    #parent;
    #categoryId;
    #productId;

    /**
    * Конструктор класса
    * @param {Element} parent Родительский элемент
    * @param {String} productId id продукта
    * @param {String} categoryId id категории
    */
    constructor(parent, productId, categoryId) {
        this.#parent = parent;
        this.#categoryId = categoryId;
        this.#productId = productId;
    }

    /**
     * Получение id
     */
    get id() {
        return 'recommendations' + this.#productId;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.querySelector(`#${this.id}`);
    }

    /**
     * Отрисовка карусели
     * @param {Object} body Список товаров
     */
    renderCarousel(body) {
        const carousel = new Carousel(this.self, recCarousel, body);
        carousel.render();
        this.unsubscribeToEvents();
    }

    renderCarousel = this.renderCarousel.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.REC_PRODUCTS, this.renderCarousel);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.REC_PRODUCTS, this.renderCarousel);
    }

    /**
   * Отрисовка компонента карточки продукта
   */
    render() {
        this.subscribeToEvents();
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template({id: this.id}),
        );
        ProductsActions.getRecProducts(this.#productId, this.#categoryId);
    }
}
