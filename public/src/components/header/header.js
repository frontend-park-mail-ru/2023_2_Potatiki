import {userStore} from '../../stores/user.js';
import Button from '../button/button.js';
import Link from '../link/link.js';
import SearchForm from '../searchForm/searchForm.js';
import template from './header.hbs';
import {config} from '../../../config.js';

/**
 * Класс хедера страницы
 */
export default class Header {
    #parent;

    #config;


    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.mainPage.header;
    }

    /**
   * Отрисовка компонента хедера
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(),
        );

        const self = document.querySelector('#header');

        const logo = new Link(self, this.#config.logo);
        logo.render();

        const catalog = new Button(self, this.#config.catalog);
        catalog.render();

        const search = new SearchForm(
            self,
            this.#config.search,
        );
        search.render();

        const orders = new Link(self, this.#config.orders);
        orders.render();

        const favorite = new Link(self, this.#config.favorite);
        favorite.render();

        const basket = new Link(self, this.#config.basket);
        basket.render();

        const profileState = userStore.isAuth ? this.#config.profile : this.#config.login;

        const user = new Link(self, profileState);
        user.render();

        if (userStore.isAuth) {
            const logout = new Link(self, this.#config.logout);
            logout.render();
        }
    }
}
