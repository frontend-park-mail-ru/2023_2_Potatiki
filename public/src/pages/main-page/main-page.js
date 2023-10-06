import Carousel from '../../components/carousel/carousel.js';
import Header from '../../components/header/header.js';
import Ajax from '../../modules/ajax.js';
import renderServerError from '../../modules/server-error.js';

import '../templates.js';

/**
 * Класс главной страницы
 */
export default class MainPage {
    #parent;

    #config;

    #router;

    #carousels;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   * @param {Function} router Функция осуществляющая переход на другую страницу
   */
    constructor(parent, config, router) {
        this.#parent = parent;
        this.#config = config;
        this.#router = router;
        this.#carousels = [];
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
    getProducts(offset=0, count=5, config) {
        Ajax.prototype.getRequest(
            `${this.#config.requests.getProducts}?paging=${offset}&count=${count}`)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    const carousel = new Carousel(this.self, config, body);
                    carousel.render();
                    this.#carousels.push(carousel);
                    break;
                case 429:
                    renderServerError(body.error);
                    break;
                default:
                    break;
                }
            });
    }

    /**
     *
     */
    removeListeners() {
        const buttonId = this.#config.mainPage.header.search.submit.id;
        const button = document.querySelector(`#${buttonId}`);
        button.removeEventListener('click', this.searchFormListener);
        this.#carousels.forEach((elem) => {
            elem.removeListeners();
        });
    }

    /**
   * Отрисовка страницы регистрации
   */
    render() {
        this.#parent.innerHTML = window.Handlebars.templates['main-page.hbs']();

        const header = new Header(
            this.self,
            this.#config.mainPage.header,
            this.#config.isAuthorized,
        );
        header.render();

        this.getProducts(0, 10, this.#config.mainPage.newCarousel);

        this.getProducts(0, 10, this.#config.mainPage.popularCarousel);
    }
}
