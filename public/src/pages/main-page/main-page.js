import './main-page.scss';
import Carousel from '../../components/carousel/carousel.js';
import Header from '../../components/header/header.js';
import template from './main-page.hbs';
import {config} from '../../../config.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {ProductsActions} from '../../actions/products.js';
import IFrame from '../../components/iframe/iframe.js';


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
        return document.getElementById('main-page');
    }

    /**
     * Отображение продуктов на главной странице
     * @param {Object} body Данные о продуктах
     * @param {Object} config Конфиг для отображения элементов
     */
    renderProducts(body, config) {
        const carousel = new Carousel(this.self, config, body);
        carousel.render();
        this.#carousels.push(carousel);
    }

    renderProducts = this.renderProducts.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PRODUCTS, this.renderProducts);
    }

    /**
    * Удаление листенеров
    */
    removeListeners() {
        this.#carousels.forEach((cl) => {
            cl.removeListeners();
        });
    }

    /**
    * Отписка от событий
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCTS, this.renderProducts);
    }

    /**
    * Отрисовка главной страницы
    */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header();
        header.render();
        this.subscribeToEvents();

        ProductsActions.getProducts(0, 30, this.#config.newCarousel);
        ProductsActions.getProducts(30, 30, this.#config.popularCarousel);

        const iframe = new IFrame();
        iframe.render();
    }
}
