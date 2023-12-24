import './index.scss';
import router from './src/modules/router';
import {UserActions} from './src/actions/user';
import {eventEmmiter} from './src/modules/event-emmiter';
import {Events} from './src/config/events';
import {renderServerMessage, renderWarningMessage} from './src/modules/server-message';
import {cartStore} from './src/stores/cart';
import {productsStore} from './src/stores/products';
import {userStore} from './src/stores/user';
import {notificationStore} from './src/stores/notification';
import MainPage from './src/pages/main-page/main-page';
import {cartRoute, categoryRoute, loginRoute,
    mainRoute, notFoundRoute, orderRoute, ordersRoute, productRoute,
    signupRoute, profileRoute, searchRoute, reviewRoute} from './src/config/urls';
import LoginPage from './src/pages/login-page/login-page';
import SignupPage from './src/pages/signup-page/signup-page';
import CartPage from './src/pages/cart-page/cart-page';
import NotFoundPage from './src/pages/not-found-page/not-found-page';
import OrderPage from './src/pages/orderPage/order-page';
import CategoryPage from './src/pages/category-page/category-page';
import ProductPage from './src/pages/product-page/product-page';
import ProfilePage from './src/pages/profile-page/profile-page';
import OrdersPage from './src/pages/orders-page/orders-page';
import SearchPage from './src/pages/search-page/search-page';
import ReviewsPage from './src/pages/reviews-page/reviews-page';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'})
        .then((reg) => {
            console.log('sw registered', reg);
        })
        .catch((e) => {
            console.error(e);
        });
}

// eslint-disable-next-line no-unused-vars
const ustore = userStore;
// eslint-disable-next-line no-unused-vars
const cstore = cartStore;
// eslint-disable-next-line no-unused-vars
const pstore = productsStore;
// eslint-disable-next-line no-unused-vars
const nstore = notificationStore;

const pages = [{view: MainPage, url: mainRoute, name: 'Zuzu'},
    {view: SignupPage, url: signupRoute, name: 'Регистрация'},
    {view: LoginPage, url: loginRoute, name: 'Авторизация'},
    {view: NotFoundPage, url: notFoundRoute, name: 'Страница не найдена'},
    {view: CartPage, url: cartRoute, name: 'Корзина'},
    {view: OrderPage, url: orderRoute, name: 'Оформление заказа'},
    {view: CategoryPage, url: categoryRoute, name: 'Товары'},
    {view: ProductPage, url: productRoute, name: 'Товары'},
    {view: ProfilePage, url: profileRoute, name: 'Профиль'},
    {view: OrdersPage, url: ordersRoute, name: 'Мои заказы'},
    {view: SearchPage, url: searchRoute, name: 'Поиск'},
    {view: ReviewsPage, url: reviewRoute, name: 'Отзывы'},
];

pages.forEach((page) => {
    router.register(page);
});

if (navigator.onLine) {
    UserActions.setOnline();
} else {
    UserActions.setOffline();
}

window.addEventListener('online', UserActions.setOnline);
window.addEventListener('offline', UserActions.setOffline);
document.addEventListener('DOMContentLoaded', UserActions.checkSession());
eventEmmiter.subscribe(Events.USER_IS_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.LOGOUT, router.go.bind(router));
eventEmmiter.subscribe(Events.SERVER_MESSAGE, renderServerMessage);
eventEmmiter.subscribe(Events.WARN_MESSAGE, renderWarningMessage);
eventEmmiter.subscribe(Events.REDIRECT, router.go.bind(router));
const root = document.getElementById('container-main');
router.start(root);
