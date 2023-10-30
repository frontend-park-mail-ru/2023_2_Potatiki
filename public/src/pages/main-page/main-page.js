import {getProductsUrl} from '../../../config.js';
import Carousel from '../../components/carousel/carousel.js';
import Header from '../../components/header/header.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';
import template from './main-page.hbs';
import {config} from '../../../config.js';
import {getProducts} from '../../config/urls.js';

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

    /**
   * Получение и отрисовка карусели товаров
   * @param {Number} offset Сдвиг в списке товаров
   * @param {Number} count Количество запрашиваемых товаров
   * @param {Object} config Конфиг карусели
   */
    getProducts(offset = 0, count = 5, config) {
        Ajax.prototype
            .getRequest(`${getProducts}?paging=${offset}&count=${count}`)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    const carousel = new Carousel(this.self, config, body);
                    carousel.render();
                    this.#carousels.push(carousel);
                    break;
                case 429:
                    renderServerError(body.error || 'Ошибка');
                    break;
                default:
                    break;
                }
            });
    }

    /**
    *
    */
    removeListeners() {}

    /**
    *
    */
    unsubscribeToEvents() {}

    /**
    * Отрисовка страницы регистрации
    */
    render() {
        this.#parent.innerHTML = template();

        const header = new Header(this.self);
        header.render();

        this.getProducts(0, 10, this.#config.newCarousel);

        this.getProducts(0, 10, this.#config.popularCarousel);
    }
}
