import './main-page.scss';
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
        return document.getElementById('main-page');
    }

<<<<<<< HEAD
    /**
     * Отображение продуктов на главной странице
     * @param {Object} body Данные о продуктах
     * @param {Object} config Конфиг для отображения элементов
     */
=======
>>>>>>> origin/main
    renderProducts(body, config) {
        const carousel = new Carousel(this.self, config, body);
        carousel.render();
        this.#carousels.push(carousel);
    }

    renderProducts = this.renderProducts.bind(this);

<<<<<<< HEAD
    /**
     * Подписка на события
     */
=======
>>>>>>> origin/main
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.PRODUCTS, this.renderProducts);
    }

    /**
<<<<<<< HEAD
    * Удаление листенеров
=======
    *
>>>>>>> origin/main
    */
    removeListeners() {
        this.#carousels.forEach((cl) => {
            cl.removeListeners();
        });
    }

    /**
<<<<<<< HEAD
    * Отписка от событий
=======
    *
>>>>>>> origin/main
    */
    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.PRODUCTS, this.renderProducts);
    }

    /**
<<<<<<< HEAD
    * Отрисовка главной страницы
=======
    * Отрисовка страницы регистрации
>>>>>>> origin/main
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
