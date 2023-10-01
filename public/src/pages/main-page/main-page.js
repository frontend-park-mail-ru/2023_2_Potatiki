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

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   * @param {Function} router Функция осуществляющая переход на другую страницу
   */
    constructor(parent, config, router) {
        this.#parent = parent;
        this.#config = config;
        this.#router = router; // пока не нужен?
    }

    /**
   * Получение и отрисовка карусели товаров
   * @param {Number} offset Сдвиг в списке товаров
   * @param {Number} count Количество запрашиваемых товаров
   */
    getProducts(offset=0, count=5) {
        const [statusCode, body] = Ajax.getRequest(`products/?offset=${offset}&count=${count}`);
        switch (statusCode) {
        case 200:
            const carousel = new Carousel(self, body.body);
            carousel.render();
            break;
        case 500:
            renderServerError(body.error);
            break;
        default:
            console.log('undefined status code');
            break;
        }
    }

    /**
   * Обработка формы поиска по странице
   * @param {Object} event
   */
    searchFormListener(event) {
        e.preventDefault();
        const form = document.forms['search-form'];
        const search = form.elements.search.value;
    }

    // add removeListeners

    /**
   * Отрисовка страницы регистрации
   */
    render() {
        this.#parent.innerHTML = '';

        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['main-page.hbs'](),
        );

        const self = document.getElementById('main-page');
        const header = new Header(
            self,
            this.#config.mainPage.header,
            this.searchFormListener.bind(this),
            this.#config.isAuthorized,
        );
        header.render();

        this.getProducts(0, 5);
    }
}
