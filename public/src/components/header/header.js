import Button from '../button/button.js';
import Link from '../link/link.js';
import SearchForm from '../searchForm/searchForm.js';
import '../templates.js';

/**
 * Класс хедера страницы
 */
export default class Header {
    #parent;

    #config;

    #searchHandle;

    #isAuth;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки класса
   * @param {Function} searchHandle Функция, вызываемая при нажатии кнопки поиска
   * @param {Bool} isAuth Данные об авторизации пользователя
   */
    constructor(parent, config, searchHandle, isAuth) {
        this.#parent = parent;
        this.#config = config;
        this.#searchHandle = searchHandle;
        this.#isAuth = isAuth;
    }

    /**
   * Отрисовка компонента хедера
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['header.hbs'](),
        );

        const self = document.getElementById('header');

        const logo = new Link(self, this.#config.logo);
        logo.render();

        const catalog = new Button(self, this.#config.catalog);
        catalog.render();

        const search = new SearchForm(
            self,
            this.#config.search,
            this.#searchHandle,
        );
        search.render();

        const orders = new Link(self, this.#config.orders);
        orders.render();

        const favorite = new Link(self, this.#config.favorite);
        favorite.render();

        const basket = new Link(self, this.#config.basket);
        basket.render();

        const profileState = this.#isAuth ? this.#config.profile : this.#config.login;

        const user = new Link(self, profileState);
        user.render();

        if (this.#isAuth) {
            const logout = new Link(self, this.#config.logout);
            logout.render();
        } else {
            
        }
    }
}
