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
import Catalog from '../catalog/catalog.js';
import './header.css';

/**
 * Класс хедера страницы
 */
export default class Header {
    #parent;

    #config;

    cart;

    catalogButton;

    catalog;

    logoutButton;

    user;


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

    logout(event) {
        event.preventDefault();
        UserActions.logout();
    }

    renderCatalog() {
        this.catalog = new Catalog();
        this.catalog.render();
        this.catalogButton.img.src = '/static/images/cross.svg';
        this.catalogButton.self.removeEventListener('click', this.renderCatalog);
        this.catalogButton.self.addEventListener('click', this.hideCatalog);
    }

    hideCatalog() {
        this.catalogButton.img.src = '/static/images/burger.svg';
        this.catalogButton.self.removeEventListener('click', this.hideCatalog);
        this.catalogButton.self.addEventListener('click', this.renderCatalog);
        this.catalog.self.remove();
        this.catalog.unsubscribeToEvents();
    }

    hideCatalog = this.hideCatalog.bind(this);
    renderCatalog = this.renderCatalog.bind(this);
    updateCartCount = this.updateCartCount.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    logout = this.logout.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.UPDATE_CART_ICON, this.updateCartCount);
        eventEmmiter.subscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.subscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
    }

    unsubscribeToEvents() {
        eventEmmiter.unsubscribe(Events.REMOVE_LISTENERS, this.removeListeners);
        eventEmmiter.unsubscribe(Events.REMOVE_SUBSCRIBES, this.unsubscribeToEvents);
        eventEmmiter.unsubscribe(Events.UPDATE_CART_ICON, this.updateCartCount);
    }

    removeListeners() {
        this.logoutButton?.removeEventListener('click', logout);
    }

    /**
   * Отрисовка компонента хедера
   */
    render() {
        document.querySelector('#container-header').innerHTML = template();

        const self = document.querySelector('#header');

        const search = new SearchForm(
            self,
            this.#config.search,
            true,
        );
        search.render();

        this.catalogButton = new Button(self, this.#config.catalog, true);
        this.catalogButton.render();
        this.catalogButton.self.addEventListener('click', this.renderCatalog);

        const logo = new Link(self, this.#config.logo, true);
        logo.render();

        const orders = new Link(self.querySelector('.header__icons-container'), this.#config.orders);
        orders.render();

        const favorite = new Link(self.querySelector('.header__icons-container'), this.#config.favorite);
        favorite.render();

        this.cart = new Link(self.querySelector('.header__icons-container'), this.#config.basket);
        this.cart.render();

        const profileState = userStore.isAuth ? this.#config.profile : this.#config.login;

        this.user = new Link(self.querySelector('.header__icons-container'), profileState);
        this.user.render();

        if (userStore.isAuth) {
            this.logoutButton = new Button(self.querySelector('.header__icons-container'), this.#config.logout);
            this.logoutButton.render();
            this.logoutButton.self.addEventListener('click', this.logout);
        }

        this.subscribeToEvents();
        CartActions.getCartCount();
    }
}
