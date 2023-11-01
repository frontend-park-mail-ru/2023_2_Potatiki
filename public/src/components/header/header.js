import {userStore} from '../../stores/user.js';
import Button from '../button/button.js';
import Link from '../link/link.js';
import SearchForm from '../searchForm/searchForm.js';
import template from './header.hbs';
import {config} from '../../../config.js';
import {eventEmmiter} from '../../modules/event-emmiter.js';
import {Events} from '../../config/events.js';
import {UserActions} from '../../actions/user.js';
import {CartActions} from '../../actions/cart.js';

/**
 * Класс хедера страницы
 */
export default class Header {
    #parent;

    #config;

    cart;


    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.mainPage.header;
    }

    updateCartCount(count) {
        this.cart.self.querySelector('.cart-count').textContent = count;
    }

    updateCartCount = this.updateCartCount.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_CART_ICON, this.updateCartCount);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.UPDATE_CART_ICON, this.updateCartCount);
    }

    /**
   * Отрисовка компонента хедера
   */
    render() {
        this.#parent.insertAdjacentHTML(
            'afterbegin',
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

        this.cart = new Link(self, this.#config.basket);
        this.cart.render();

        const profileState = userStore.isAuth ? this.#config.profile : this.#config.login;

        const user = new Link(self, profileState);
        user.render();

        if (userStore.isAuth) {
            const logout = new Link(self, this.#config.logout);
            logout.render();
        }

        this.subscribeToEvents();
        CartActions.getCartCount();
    }
}
