import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {getCartProductsUrl, updateCartUrl, addProductUrl, delProductUrl, loginRoute,
    cartRoute, createOrderUrl, orderRoute, mainRoute, getAllOrdersUrl} from '../config/urls';
import {Events} from '../config/events';
import {CartActionsType} from '../actions/cart';
import {replacer, reviver} from '../modules/utils';
import {userStore} from './user';

/**
 * Класс хранилище корзины
 */
class CartStore {
    #state = {

    };

    /**
     * конструктор класса
     */
    constructor() {
        this.registerEvents();
        this.subscribeToEvents();
    }

    /**
     * Регистриция событий, которые будет обрабатывать функции класса
     */
    registerEvents() {
        AppDispatcher.register((action) => {
            switch (action.type) {
            case CartActionsType.GET_CART_PRODUCTS:
                this.getCartProducts();
                break;
            case CartActionsType.ADD_CART_BUTTON:
                this.isProductInCart(action.payload.id);
                break;
            case CartActionsType.ADD_PRODUCT_LOCAL:
                this.addProductLocal(action.payload.data);
                break;
            case CartActionsType.CHANGE_PRODUCT_COUNT_LOCAL:
                this.changeProductCountLocal(
                    action.payload.data,
                    action.payload.isDecrease,
                );
                break;
            case CartActionsType.GET_CART_COUNT:
                this.getCartCount();
                break;
            case CartActionsType.REMOVE_LISTENERS:
                this.removeListeners();
                break;
            case CartActionsType.DEL_PRODUCT:
                this.deleteProduct(action.payload.data);
                break;
            case CartActionsType.UPDATE_ORDER:
                this.updateOrder(action.payload.page);
                break;
            case CartActionsType.GET_CATEGORIES:
                this.getCategories();
                break;
            case CartActionsType.GET_ALL_ORDERS:
                this.getALlOrders();
                break;
            default:
                break;
            }
        });
    }

    /**
     * Обработка авторизации пользовтеля
     */
    userAuth() {
        this.updateCart();
    }

    /**
     * Обработка выхода пользовтеля
     */
    userLogout() {
        this.cleanCart();
    }

    userAuth = this.userAuth.bind(this);
    userLogout = this.userLogout.bind(this);

    /**
     * Подписка на события
     */
    subscribeToEvents() {
        eventEmmiter.subscribe(Events.USER_IS_AUTH, this.userAuth);
        eventEmmiter.subscribe(Events.SUCCESSFUL_LOGIN, this.userAuth);
        eventEmmiter.subscribe(Events.SUCCESSFUL_SIGNUP, this.userAuth);
        eventEmmiter.subscribe(Events.LOGOUT, this.userLogout);
    }

    /**
     * Очистка содержимого корзины
     */
    cleanCart() {
        const EmptyCart = new Map();
        localStorage.setItem('products_map', JSON.stringify(EmptyCart, replacer));
        this.cartEvents();
    }

    /**
     * Обновление содержимого корзины
     */
    updateCart() {
        const currentCart = JSON.parse(localStorage.getItem('products_map'), reviver);
        const data = [];
        if (currentCart) {
            currentCart.forEach((product) => {
                data.push(product);
            });
        }
        Ajax.prototype.postRequest(updateCartUrl, {products: data},
            userStore.csrfToken).then((result) => {
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                const productsMap = new Map();
                body.products.forEach((product) => {
                    productsMap.set(product.productId, product);
                });
                localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
                this.cartEvents();
                break;
            case 401:
                eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                break;
            case 429:
                break;
            default:
                break;
            }
        });
    }


    /**
     * Получение и отрисовка товаров в корзине
     */
    getCartProducts() {
        if (!userStore.isAuth || !userStore.connection) {
            const currentCart = JSON.parse(localStorage.getItem('products_map'), reviver);
            if (!currentCart) {
                eventEmmiter.emit(Events.EMPTY_CART);
                return;
            }
            const products = [];
            if (currentCart) {
                currentCart.forEach((product) => {
                    products.push(product);
                });
            }
            eventEmmiter.emit(Events.CART_PRODUCTS, {products});
            this.cartEvents();
            return;
        }
        Ajax.prototype.getRequest(getCartProductsUrl)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    eventEmmiter.emit(Events.CART_PRODUCTS, body);
                    const productsMap = new Map();
                    body.products?.forEach((product) => {
                        productsMap.set(product.productId, product);
                    });
                    localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
                    this.cartEvents();
                    break;
                case 401:
                    eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                    break;
                case 429:
                    eventEmmiter.emit(Events.SERVER_MESSAGE,
                        'Возникла ошибка при получении товаров корзины');
                    break;
                default:
                    break;
                }
            });
    }

    /**
     * Взятие количества товаров в корзине
     * @return {Number} Количество товара в корзине
     */
    getCartCount() {
        const [count] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, count);
        return count;
    }

    /**
     * Добавление товаров корзины в local storage
     * @param {Object} data Данные о товарах
     */
    async addProductLocal(data) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        if (this.getCartCount() > 99) {
            eventEmmiter.emit(Events.SERVER_MESSAGE,
                'В одном заказе можно заказать не более 100 товаров');
            return;
        }
        data.quantity += 1;
        if (userStore.isAuth && userStore.connection) {
            if (!await this.simpleAjax(addProductUrl,
                {productId: data.productId, quantity: data.quantity})) {
                if (userStore.isAuth) {
                    return;
                }
            }
        }
        if (!productsMap) {
            const productsMap = new Map();
            productsMap.set(data.productId, data);
            localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
            eventEmmiter.emit(Events.ADD_PRODUCT_SUCCESS, data);
            eventEmmiter.emit(Events.UPDATE_CART_ICON, 1);
            eventEmmiter.emit(Events.UPDATE_CART_RESULT, 1, data.price);
            return;
        }

        productsMap.set(data.productId, data);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        eventEmmiter.emit(Events.ADD_PRODUCT_SUCCESS, data);
        this.cartEvents();
    }

    /**
     * Изменение содержания локальной корзины
     * @param {object} data Новые товары
     * @param {Boolean} isDecrease Флаг об уменьшении размера корзины
     */
    async changeProductCountLocal(data, isDecrease) {
        if (!isDecrease) {
            if (this.getCartCount() > 99) {
                eventEmmiter.emit(Events.SERVER_MESSAGE,
                    'В одном заказе можно заказать не более 100 товаров');
                return;
            }
        }
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        const product = productsMap.get(data.productId);
        if (!product) {
            return;
        }
        product.quantity += isDecrease ? -1 : 1;
        if (!product.quantity) {
            this.deleteProduct(data);
            return;
        }
        if (userStore.isAuth && userStore.connection) {
            if (!await this.simpleAjax(addProductUrl,
                {productId: data.productId, quantity: product.quantity},
                userStore.csrfToken)) {
                if (userStore.isAuth) {
                    return;
                }
            }
        }
        productsMap.set(data.productId, product);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        eventEmmiter.emit(Events.CHG_PRODUCT_SUCCESS, product);
        this.cartEvents();
    }

    /**
     * Удаление товара из корзины
     * @param {Object} data Данные об удаляемом товаре
     */
    async deleteProduct(data) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        const product = productsMap.get(data.productId);
        if (!product) {
            return;
        }
        if (userStore.isAuth && userStore.connection) {
            const [statusCode] = await Ajax.prototype.deleteRequest(
                delProductUrl,
                {productId: data.productId}, userStore.csrfToken,
            );
            switch (statusCode) {
            case 200:
                break;
            case 401:
                eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                return;
            case 429:
                eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при удалении товара');
                return;
            default:
                return;
            }
        }
        productsMap.delete(data.productId);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        eventEmmiter.emit(Events.DEL_PRODUCT_SUCCESS, product);
        this.cartEvents();
    }

    /**
     * Оформление заказа
     * @param {String} page На какой странице оформление заказа
     */
    updateOrder(page) {
        let continueUrl = '';
        switch (page) {
        case cartRoute:
            continueUrl = orderRoute;
            break;
        case orderRoute:
            continueUrl = mainRoute;
            break;
        default:
            break;
        }
        if (!userStore.isAuth) {
            eventEmmiter.emit(Events.SERVER_MESSAGE,
                'Для оформления заказа необходимо авторизоваться');
            eventEmmiter.emit(Events.REDIRECT, {url: loginRoute, continue: continueUrl});
            return;
        }
        switch (page) {
        case cartRoute:
            eventEmmiter.emit(Events.REDIRECT, {url: orderRoute});
            break;
        case orderRoute:
            if (!userStore.connection) {
                eventEmmiter.emit(Events.SERVER_MESSAGE,
                    'Невозможно оформить заказ в оффлайн-режиме');
                return;
            }
            Ajax.prototype.postRequest(createOrderUrl, {}, userStore.csrfToken)
                .then((result) => {
                    const [statusCode] = result;
                    switch (statusCode) {
                    case 200:
                        eventEmmiter.emit(Events.REDIRECT, {url: mainRoute});
                        eventEmmiter.emit(Events.SERVER_MESSAGE, 'Заказ успешно оформлен', true);
                        this.cleanCart();
                        this.cartEvents();
                        break;
                    case 401:
                        eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                        break;
                    case 429:
                        eventEmmiter.emit(Events.SERVER_MESSAGE,
                            'Возникла ошибка при создании заказа');
                        break;
                    default:
                        break;
                    }
                });
            break;
        default:
            break;
        }
    }

    /**
     * Взятие заказов пользователя
     */
    async getALlOrders() {
        const [statusCode, body] = await Ajax.prototype.getRequest(getAllOrdersUrl);
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.ALL_ORDERS, body);
            break;
        case 401:
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
            break;
        case 404:
            eventEmmiter.emit(Events.NOT_FOUND);
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_MESSAGE, 'Возникла ошибка при получении заказов');
            break;
        default:
            break;
        }
    }

    /**
     * Возвращает информацию о товарах в корзине
     * @return {[Number, Number]}
     */
    getProductsInfo() {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        let price = 0;
        let count = 0;
        if (!productsMap) {
            eventEmmiter.emit(Events.EMPTY_CART);
            return [count, price];
        }
        productsMap.forEach((product) => {
            price += product.price * product.quantity;
            count += product.quantity;
        });
        if (!count) {
            eventEmmiter.emit(Events.EMPTY_CART);
        }
        return [count, price];
    }

    /**
     * Отправка данных о корзинe
     * @param {String} url Путь
     * @param {Object} data Передаваемые данные
     * @return {Boolean} Результат работы запроса
     */
    simpleAjax(url, data) {
        return Ajax.prototype
            .postRequest(url, data)
            .then((result) => {
                const [statusCode] = result;
                switch (statusCode) {
                case 200:
                    return true;
                case 401:
                    eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                    return false;
                case 429:
                    eventEmmiter.emit(Events.SERVER_MESSAGE, 'Ошибка');
                    return false;
                default:
                    return false;
                }
            });
    }

    /**
     * Сообщени подписанным компонентам об обновлении корзины
     */
    cartEvents() {
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
    }
}

export const cartStore = new CartStore();
