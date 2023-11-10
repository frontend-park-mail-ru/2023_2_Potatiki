import Carousel from '../../components/carousel/carousel.js';
import Header from '../../components/header/header.js';
import template from './main-page.hbs';
import {config} from '../../../config.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {ProductsActions} from '../../actions/products.js';


/**
 * Класс главной страницы
 */
export default class MainPage {
    #parent;

    #config;

    #carousels;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.mainPage;
        this.#carousels = [];
    }

    /**
    * Получение элемента страницы
    */
    get self() {
        return document.querySelector('#main-page');
    }

    renderProducts(body, config) {
        const carousel = new Carousel(this.self, config, body);
        carousel.render();
        this.#carousels.push(carousel);
    }

    renderProducts = this.renderProducts.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PRODUCTS, this.renderProducts);
    }

    /**
    *
    */
    removeListeners() {
        this.#carousels.forEach((cl) => {
            cl.removeListeners();
        });
    }

    /**
    *
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCTS, this.renderProducts);
    }

    /**
    * Отрисовка страницы регистрации
    */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header();
        header.render();
        this.subscribeToEvents();

        ProductsActions.getProducts(0, 30, this.#config.newCarousel);
        ProductsActions.getProducts(30, 30, this.#config.popularCarousel);
    }
}
