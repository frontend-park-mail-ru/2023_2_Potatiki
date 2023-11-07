import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {getCartProductsUrl, updateCartUrl, addProductUrl, delProductUrl, loginRoute, cartRoute, createOrderUrl, orderRoute, mainRoute, getAllOrdersUrl} from '../config/urls';
import {Events} from '../config/events';
import {CartActionsType} from '../actions/cart';
import {replacer, reviver} from '../modules/utils';
import renderServerMessage from '../modules/server-message';
import router from '../modules/router';

/**
 * Класс
 */
class CartStore {
    #state = {
        login: '',
        password: '',
        imgSrc: '',
        isAuth: false,
        csrfToken: '',
    };

    /**
     *
     */
    constructor() {
        this.registerEvents();
        this.subscribeToEvents();
    }

    /**
     *
     */
    get isAuth() {
        return this.#state.isAuth;
    }

    /**
     *
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

    userAuth() {
        this.#state.isAuth = true;
        this.updateCart();
    }

    userNotAuth() {
        this.#state.isAuth = false;
    }

    userLogout() {
        this.#state.isAuth = false;
        this.cleanCart();
    }

    userAuth = this.userAuth.bind(this);
    userNotAuth = this.userNotAuth.bind(this);
    userLogout = this.userLogout.bind(this);
    setCSRFToken = this.setCSRFToken.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.USER_IS_AUTH, this.userAuth);
        eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, this.userNotAuth);
        eventEmmiter.subscribe(Events.SUCCESSFUL_LOGIN, this.userAuth);
        eventEmmiter.subscribe(Events.SUCCESSFUL_SIGNUP, this.userAuth);
        eventEmmiter.subscribe(Events.LOGOUT, this.userLogout);
        eventEmmiter.subscribe(Events.CSRF_TOKEN, this.setCSRFToken);
    }

    setCSRFToken(token) {
        this.#state.csrfToken = token;
    }

    cleanCart() {
        const EmptyCart = new Map();
        localStorage.setItem('products_map', JSON.stringify(EmptyCart, replacer));
    }

    updateCart() {
        const currentCart = JSON.parse(localStorage.getItem('products_map'), reviver);
        const data = [];
        if (currentCart) {
            currentCart.forEach((product) => {
                data.push(product);
            });
        }
        Ajax.prototype.postRequest(updateCartUrl, {products: data}, this.#state.csrfToken).then((result) => {
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
                renderServerMessage('Ошибка обновления корзины');
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
        if (!this.isAuth) {
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
                    renderServerMessage('Возникла ошибка при получении товаров корзины');
                    break;
                default:
                    break;
                }
            });
    }

    getCartCount() {
        const [count] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, count);
    }

    async addProductLocal(data) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        data.quantity += 1;
        if (this.isAuth) {
            if (!await this.simpleAjax(addProductUrl, {productId: data.productId, quantity: data.quantity})) {
                return;
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

    async changeProductCountLocal(data, isDecrease) {
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
        if (this.isAuth) {
            if (!await this.simpleAjax(addProductUrl, {productId: data.productId, quantity: product.quantity}, this.#state.setCSRFToken)) {
                return;
            }
        }
        productsMap.set(data.productId, product);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        eventEmmiter.emit(Events.CHG_PRODUCT_SUCCESS, product);
        this.cartEvents();
    }

    async deleteProduct(data) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        const product = productsMap.get(data.productId);
        if (!product) {
            return;
        }
        if (this.isAuth) {
            const [statusCode, body] = await Ajax.prototype.deleteRequest(delProductUrl, {productId: data.productId}, this.#state.setCSRFToken);
            switch (statusCode) {
            case 200:
                break;
            case 401:
                eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                return;
            case 429:
                renderServerMessage('Возникла ошибка при удалении товара');
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
        if (!this.isAuth) {
            renderServerMessage('Для оформления заказа необходимо авторизоваться');
            router.go({url: loginRoute, continue: continueUrl});
            return;
        }
        switch (page) {
        case cartRoute:
            router.go({url: orderRoute});
            break;
        case orderRoute:
            Ajax.prototype.postRequest(createOrderUrl, {}, this.#state.csrfToken)
                .then((result) => {
                    const [statusCode, body] = result;
                    switch (statusCode) {
                    case 200:
                        router.go({url: mainRoute});
                        renderServerMessage('Заказ успешно оформлен', true);
                        this.cleanCart();
                        this.cartEvents();
                        break;
                    case 401:
                        eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                        break;
                    case 429:
                        renderServerMessage('Возникла ошибка при создании заказа');
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
            renderServerMessage('Возникла ошибка при создании заказа');
            break;
        default:
            break;
        }
    }

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

    simpleAjax(url, data) {
        return Ajax.prototype
            .postRequest(url, data)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    return true;
                case 401:
                    eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
                    return false;
                case 429:
                    renderServerMessage(body.error || 'Ошибка');
                    return false;
                default:
                    return false;
                }
            });
    }

    cartEvents() {
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
    }
}

export const cartStore = new CartStore();
