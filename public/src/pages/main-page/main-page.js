import Carousel from '../../components/carousel/carousel.js';
import Header from '../../components/header/header.js';
import template from './main-page.hbs';
import {config} from '../../../config.js';
import {UserActions} from '../../actions/user.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';

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
    constructor(parent, params) {
        this.#parent = parent;
        this.#config = config.mainPage;
        this.#carousels = [];
        if (params?.auth) {
            this.#config.isAuthorized = true;
        }
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

        const header = new Header(this.self);
        header.render();
        this.subscribeToEvents();

        UserActions.getProducts(0, 10, this.#config.newCarousel);
        UserActions.getProducts(0, 10, this.#config.popularCarousel);
    }
}
