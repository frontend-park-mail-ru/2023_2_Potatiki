import {AppDispatcher} from '../modules/dispatcher';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {getCartProductsUrl, updateCartUrl, addProductUrl, delProductUrl} from '../config/urls';
import {Events} from '../config/events';
import {CartActionsType} from '../actions/cart';
import {replacer, reviver} from '../modules/utils';
import renderServerError from '../modules/server-error';

/**
 * Класс
 */
class CartStore {
    #state = {
        login: '',
        password: '',
        imgSrc: '',
        isAuth: false,
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
        this.cleanCart();
    }

    userAuth = this.userAuth.bind(this);
    userNotAuth = this.userNotAuth.bind(this);

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.USER_IS_AUTH, this.userAuth);
        eventEmmiter.subscribe(Events.SUCCESSFUL_LOGIN, this.userAuth);
        eventEmmiter.subscribe(Events.SUCCESSFUL_SIGNUP, this.userAuth);
        eventEmmiter.subscribe(Events.LOGOUT, this.userNotAuth);
    }

    cleanCart() {
        localStorage.setItem('products_map', '');
        // что-то еще мб
    }

    updateCart() {
        const currentCart = JSON.parse(localStorage.getItem('products_map'), reviver);
        const data = [];
        if (currentCart) {
            currentCart.forEach((product) => {
                data.push(product);
            });
        }
        Ajax.prototype.postRequest(updateCartUrl, {products: data}).then((result) => {
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                const productsMap = new Map();

                body.products.forEach((product) => {
                    productsMap.set(product.id, product);
                });
                localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
                const [productCount, productsPrice] = this.getProductsInfo();
                eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
                eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
                break;
            case 429:
                renderServerError(body.error || 'Ошибка обновления корзины');
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
            const isCartExist = JSON.parse(localStorage.getItem('cart_status'));
            if (!isCartExist) {
                return {};
            }
            const currentCart = JSON.parse(localStorage.getItem('products_map'), reviver);
            const products = [];
            if (currentCart) {
                currentCart.forEach((product) => {
                    products.push(product);
                });
            }
            eventEmmiter.emit(Events.CART_PRODUCTS, {products});
            const [productCount, productsPrice] = this.getProductsInfo();
            eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
            eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
            return;
        }
        Ajax.prototype.getRequest(getCartProductsUrl)
            .then((result) => {
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    eventEmmiter.emit(Events.CART_PRODUCTS, body);
                    const productsMap = new Map();
                    body.products.forEach((product) => {
                        productsMap.set(product.id, product);
                    });
                    localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
                    const [productCount, productsPrice] = this.getProductsInfo();
                    eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
                    eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
                    break;
                case 429:
                    renderServerError(body.error || 'Ошибка');
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

    addProductLocal(data) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        data.quantity += 1;
        if (this.isAuth) {
            if (!this.simpleAjax(addProductUrl, {id: data.id, quantity: data.quantity})) {
                return;
            }
        }
        if (!productsMap) {
            const productsMap = new Map();
            productsMap.set(data.id, data);
            localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
            eventEmmiter.emit(Events.ADD_PRODUCT_SUCCESS, data);
            eventEmmiter.emit(Events.UPDATE_CART_ICON, 1);
            eventEmmiter.emit(Events.UPDATE_CART_RESULT, 1, data.price);
            return;
        }

        productsMap.set(data.id, data);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.ADD_PRODUCT_SUCCESS, data);
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
    }

    changeProductCountLocal(data, isDecrease) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        const product = productsMap.get(data.id);
        if (!product) {
            return;
        }
        product.quantity += isDecrease ? -1 : 1;
        if (!product.quantity) {
            this.deleteProduct(data);
            return;
        }
        if (this.isAuth) {
            if (!this.simpleAjax(addProductUrl, {id: data.id, quantity: product.quantity})) {
                return;
            }
        }
        productsMap.set(data.id, product);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        eventEmmiter.emit(Events.CHG_PRODUCT_SUCCESS, product);
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
    }

    deleteProduct(data) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        const product = productsMap.get(data.id);
        if (!product) {
            return;
        }
        if (this.isAuth) {
            if (!this.simpleAjax(delProductUrl, {id: data.id})) {
                return;
            }
        }
        productsMap.delete(data.id);
        localStorage.setItem('products_map', JSON.stringify(productsMap, replacer));
        eventEmmiter.emit(Events.DEL_PRODUCT_SUCCESS, product);
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
        return;
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
                case 429:
                    renderServerError(body.error || 'Ошибка');
                    return false;
                default:
                    return false;
                }
            });
    }
}

export const cartStore = new CartStore();
