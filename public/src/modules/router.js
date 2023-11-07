import MainPage from '../pages/main-page/main-page';
import {cartRoute, categoryRoute, loginRoute,
    mainRoute, notFoundRoute, orderRoute, ordersRoute, productRoute, signupRoute, profileRoute} from '../config/urls';
import LoginPage from '../pages/login-page/login-page';
import SignupPage from '../pages/signup-page/signup-page';
import CartPage from '../pages/cart-page/cart-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import {UserActions} from '../actions/user';
import OrderPage from '../pages/orderPage/order-page';
import CategoryPage from '../pages/category-page/category-page';
import ProductPage from '../pages/product-page/product-page';
import ProfilePage from '../pages/profile-page/profile-page';
import OrdersPage from '../pages/orders-page/orders-page';

/**
 * Класс роутера
 */
class Router {
    #history;
    #root;
    #states;
    #currentView;

    /**
     * Конструктор для класса роутера
     */
    constructor() {
        this.#history = window.history;
    }

    /**
     * Добавление состояния для представления
     */
    register({name, url, view}) {
        this.#states.set(
            url,
            {name, url, view},
        );
    }

    /**
     * Запуск роутера
     * @param {Element} root Корневой компонент
     */
    start(root) {
        this.#root = root;

        window.onpopstate = (event) => {
            this.go(event.state, true);
        };

        this.#states = new Map([
            [mainRoute, {view: MainPage, url: mainRoute, name: 'main'}],
            [signupRoute, {view: SignupPage, url: signupRoute, name: 'signup'}],
            [loginRoute, {view: LoginPage, url: loginRoute, name: 'login'}],
            [notFoundRoute, {view: NotFoundPage, url: notFoundRoute, name: 'not-found'}],
            [cartRoute, {view: CartPage, url: cartRoute, name: 'cart'}],
            [orderRoute, {view: OrderPage, url: orderRoute, name: 'order'}],
            [categoryRoute, {view: CategoryPage, url: categoryRoute, name: 'category'}],
            [productRoute, {view: ProductPage, url: productRoute, name: 'product'}],
            [profileRoute, {view: ProfilePage, url: profileRoute, name: 'my-profile'}],
            [ordersRoute, {view: OrdersPage, url: ordersRoute, name: 'orders'}],
        ]);

        window.addEventListener('click', this.listenClick.bind(this));
    }

    /**
     * Listener для нажатий по ссылкам
     * @param {Event} event Событие нажатия по ссылке
     */
    listenClick(event) {
        event.preventDefault();
        const anchor = event.target.closest('a');
        if (!anchor) {
            return;
        }
        this.go({url: anchor.getAttribute('href')});
    };

    /**
     * Метод осуществляющий переход на страницу
     * @param {Object} state Состояние представленя
     * @param {Boolean} replaceState Если true заменяем текущее состояние
     *                               иначе добавляем новое
     */
    go(state, replaceState) {
        let baseState = this.#states.get(state.url);
        console.log(baseState);
        console.log(this.#states);
        let idParam;
        if (!baseState) {
            const urlWithoutParams = state.url.substring(0, state.url.lastIndexOf('/'));

            baseState = this.#states.get(urlWithoutParams);
            if (!baseState) {
                this.go({url: notFoundRoute});
                return;
            }
            idParam = state.url.substring(state.url.lastIndexOf('/') + 1);
        }

        if (this.#currentView && this.#currentView.removeListeners) {
            this.#currentView.removeListeners();
            this.#currentView.unsubscribeToEvents();
            UserActions.removeListeners();
        }

        this.#currentView = new baseState.view(this.#root, {continue: state.continue, idParam});
        console.log(this.#currentView);
        this.#currentView.render();
        if (replaceState) {
            this.#history.replaceState(
                state,
                '',
                state.url,
            );
            return;
        }
        this.#history.pushState(
            state,
            '',
            state.url,
        );
    }

    /**
     * Переход назад по истории браузера
     */
    back() {
        this.#history.back();
    }

    /**
     * Переход вперед по истории браузера
     */
    forward() {
        this.#history.forward();
    }
}

export default new Router();
