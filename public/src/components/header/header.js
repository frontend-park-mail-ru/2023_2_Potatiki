import './header.scss';
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
import CartIcon from '../cartIcon/cart-icon.js';
import ProfileMenu from '../profileMenu/profileMenu.js';
import Notification from '../notification/notification.js';

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
    isRendered;
    profileMenu;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   */
    constructor(parent) {
        this.#parent = parent;
        this.#config = config.mainPage.header;
        this.isRendered = false;
    }

    /**
     * Взятие элемента компонента
     */
    get self() {
        return document.getElementById('header');
    }

    /**
     * Logout
     * @param {Event} event Событие, вызвающее logout
     */
    logout(event) {
        event.preventDefault();
        UserActions.logout();
    }

    /**
     * Отрисовка каталога
     */
    renderCatalog() {
        this.catalog = new Catalog();
        this.catalog.render();
        this.catalogButton.img.src = '/static/images/cross.svg';
        this.catalogButton.self.removeEventListener('click', this.renderCatalog);
        this.catalogButton.self.addEventListener('click', this.hideCatalog);
    }

    /**
     * Отрисовка меню профиля
     */
    renderProfileMenu() {
        this.profileMenu = new ProfileMenu(document.getElementById('profile-button'));
        this.profileMenu.render();
    }

    /**
     * Удаление отображение каталога
     */
    hideCatalog() {
        this.catalogButton.img.src = '/static/images/burger.svg';
        this.catalogButton.self.removeEventListener('click', this.hideCatalog);
        this.catalogButton.self.addEventListener('click', this.renderCatalog);
        this.catalog?.self?.remove();
        this.catalog?.unsubscribeToEvents();
    }

    /**
     * Удаление отображение меню профиля
     */
    hideProfileMenu() {
        this.profileMenu?.self?.remove();
    }

    hideCatalog = this.hideCatalog.bind(this);
    renderCatalog = this.renderCatalog.bind(this);
    hideProfileMenu = this.hideProfileMenu.bind(this);
    renderProfileMenu = this.renderProfileMenu.bind(this);
    removeListeners = this.removeListeners.bind(this);
    unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    logout = this.logout.bind(this);
    authorizedHeader = this.authorizedHeader.bind(this);
    unauthorizedHeader = this.unauthorizedHeader.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        // eventEmmiter.subscribe(Events.USER_IS_AUTH, this.authorizedHeader);
        // eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, this.unauthorizedHeader);
        eventEmmiter.subscribe(Events.LOGOUT, this.unauthorizedHeader);
        eventEmmiter.subscribe(Events.CATEGORY_NAME, this.hideCatalog);
    }

    /**
     * Отписка от событий
     */
    unsubscribeToEvents() {
        // eventEmmiter.unsubscribe(Events.USER_IS_AUTH, this.authorizedHeader);
        // eventEmmiter.unsubscribe(Events.USER_IS_NOT_AUTH, this.unauthorizedHeader);
        eventEmmiter.unsubscribe(Events.LOGOUT, this.unauthorizedHeader);
        eventEmmiter.unsubscribe(Events.CATEGORY_NAME, this.hideCatalog);
    }

    /**
     * Удаление листенеров
     */
    removeListeners() {
        if (this.logoutButton && this.logoutButton.self) {
            this.logoutButton.self.removeEventListener('click', this.logout);
        }
    }

    /**
     * Изменение хэдера при неавторизованном пользователе
     */
    unauthorizedHeader() {
        this.user.self.remove();
        this.user = new Link(this.self.querySelector('.header__icons-container'),
            this.#config.login);
        this.user.render();
    }

    /**
     * Изменение для автоизованного пользователя
     */
    authorizedHeader() {
        this.user.self.remove();
        this.user = new Link(this.self.querySelector('.header__icons-container'),
            this.#config.profile);
        this.user.render();

        this.renderProfileMenu();
    }

    /**
     * Убрать хедер
     */
    hide() {
        this.isRendered = false;
        this.removeListeners();
        this.unsubscribeToEvents();
        document.getElementById('container-header').innerHTML = '';
    }

    /**
     * Отрисовка компонента хедера
     */
    render() {
        if (this.isRendered) {
            const queryString = location.search;
            if (queryString) {
                const params = new URLSearchParams(queryString);
                document.querySelector(`[name='search']`).value = params.get('product');
            } else {
                document.querySelector(`[name='search']`).value = '';
            }
            return;
        }

        this.isRendered = true;
        document.getElementById('container-header').innerHTML = template();

        const self = document.getElementById('header');

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

        const orders = new Link(
            self.querySelector('.header__icons-container'),
            this.#config.orders,
        );
        orders.render();

        const favorite = new Notification(
            self.querySelector('.header__icons-container'),
            this.#config.notification,
        );
        favorite.render();

        this.cart = new CartIcon(
            self.querySelector('.header__icons-container'), this.#config.basket);
        this.cart.render();

        const profileState = userStore.isAuth ? this.#config.profile : this.#config.login;
        this.user = new Link(self.querySelector('.header__icons-container'), profileState);
        this.user.render();

        if (userStore.isAuth) {
            this.renderProfileMenu();
        }

        this.subscribeToEvents();
        CartActions.getCartCount();
    }
}

export const header = new Header();
