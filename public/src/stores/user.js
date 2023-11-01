import {AppDispatcher} from '../modules/dispatcher';
import {UserActionsType} from '../actions/user';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {checkLogin, checkPassword} from '../modules/validation';
import {loginUrl, signupUrl, checkUrl, logoutUrl, mainRoute, getCartProductsUrl, getProducts, updateCartUrl, addProductUrl, delProductUrl} from '../config/urls';
import {Events} from '../config/events';
import CountManagement from '../components/countManagement/count-management';

/**
 * Класс
 */
class UserStore {
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
            case UserActionsType.CHECK_SESSION:
                this.checkSession();
                break;
            case UserActionsType.LOGIN:
                this.login(action.payload.login, action.payload.password);
                break;
            case UserActionsType.SIGNUP:
                this.signup(
                    action.payload.login,
                    action.payload.password,
                    action.payload.repeatPassword,
                );
                break;
            case UserActionsType.VALIDATE_LOGIN:
                this.validateLogin(action.payload.login);
                break;
            case UserActionsType.VALIDATE_PASSWORD:
                this.validatePassword(action.payload.password);
                break;
            case UserActionsType.VALIDATE_REPEAT_PASSWORD:
                this.validateRepeatPassword(
                    action.payload.password,
                    action.payload.repeatPassword,
                );
                break;
            case UserActionsType.LOGOUT:
                this.logout();
                break;
            case UserActionsType.GET_CART_PRODUCTS:
                this.getCartProducts();
                break;
            case UserActionsType.GET_PRODUCTS:
                this.getProducts(
                    action.payload.offset,
                    action.payload.count,
                    action.payload.config,
                );
                break;
            case UserActionsType.ADD_CART_BUTTON:
                this.isProductInCart(action.payload.id);
                break;
            case UserActionsType.ADD_PRODUCT_LOCAL:
                this.addProductLocal(action.payload.data);
                break;
            case UserActionsType.CHANGE_PRODUCT_COUNT_LOCAL:
                this.changeProductCountLocal(
                    action.payload.data,
                    action.payload.isDecrease,
                );
                break;
            case UserActionsType.GET_CART_COUNT:
                this.getCartCount();
                break;
            case UserActionsType.REMOVE_LISTENERS:
                this.removeListeners();
            default:
                break;
            }
        });
    }

    removeListeners() {
        console.log('remove listeners');
        eventEmmiter.emit(Events.REMOVE_SUBSCRIBES);
        eventEmmiter.emit(Events.REMOVE_LISTENERS);
    }

    /**
     *
     */
    async checkSession() {
        const [statusCode] = await Ajax.prototype.getRequest(checkUrl);
        switch (statusCode) {
        case 200:
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.USER_IS_AUTH, {url: location.pathname});
            this.updateCart();
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    }

    /**
     *@param {String} login
     *@param {String} password
     */
    async login(login, password) {
        const [, isValidLogin] = checkLogin(login);

        const [, isValidPassword] = checkPassword(password);

        if (!(isValidLogin && isValidPassword)) {
            eventEmmiter.emit(Events.LOGIN_FORM_ERROR, 'Неверный логин или пароль');
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(loginUrl, {
            login,
            password,
        });
        switch (statusCode) {
        case 200:
            this.#state.login = login;
            this.#state.password = password;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_LOGIN);
            this.updateCart();
            break;
        case 400:
            eventEmmiter.emit(Events.LOGIN_FORM_ERROR, 'Неверный логин или пароль');
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
    }

    updateCart() {
        const currentCart = JSON.parse(localStorage.getItem('products_map'), this.reviver);
        const data = [];
        if (currentCart) {
            currentCart.forEach((product) => {
                data.push(product);
            });
        }
        Ajax.prototype.postRequest(updateCartUrl, {products: data}).then((result) => {
            console.log(result);
            const [statusCode, body] = result;
            switch (statusCode) {
            case 200:
                const productsMap = new Map();
                body.products.forEach((product) => {
                    productsMap.set(product.id, product);
                });
                localStorage.setItem('products_map', JSON.stringify(productsMap, this.replacer));
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
     *@param {String} login
     *@param {String} password
     *@param {String} repeatPassword
     */
    async signup(login, password, repeatPassword) {
        const isValidLogin = this.validateLogin(login);
        const isValidPassword = this.validatePassword(password);
        const isValidRepeatPassword = this.validateRepeatPassword(
            password,
            repeatPassword,
        );

        if (!(isValidLogin && isValidPassword && isValidRepeatPassword)) {
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(signupUrl, {
            login,
            password,
        });
        switch (statusCode) {
        case 200:
            this.#state.login = login;
            this.#state.password = password;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_SIGNUP);
            this.updateCart();
            break;
        case 400:
            eventEmmiter.emit(
                Events.SIGNUP_FORM_ERROR,
                'Такой логин уже существует',
            );
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
    }

    /**
     *@param {String} login
     *@return {Boolean}
     */
    validateLogin(login) {
        const [error, isValidLogin] = checkLogin(login);
        if (!isValidLogin) {
            eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
            return false;
        }
        eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
        return true;
    }

    /**
     *@param {String} password
     *@return {Boolean}
     */
    validatePassword(password) {
        const [error, isValidPassword] = checkPassword(password);
        if (!isValidPassword) {
            eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
            return false;
        }
        eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
        return true;
    }

    /**
     *@param {String} password
     *@param {String} repeatPassword
     *@return {Boolean}
     */
    validateRepeatPassword(password, repeatPassword) {
        console.log(password, repeatPassword);
        if (password !== repeatPassword) {
            eventEmmiter.emit(
                Events.REPEAT_PASSWORD_INPUT_ERROR,
                'Пароли не совпадают',
            );
            return false;
        }
        return true;
    }

    /**
     *
     */
    async logout() {
        this.#state.login = '';
        this.#state.password = '';
        this.#state.isAuth = false;
        Ajax.prototype.getRequest(logoutUrl);
        eventEmmiter.emit(Events.LOGOUT, {url: mainRoute});
        localStorage.setItem('products_map', '');
        localStorage.setItem('cart_status', '');
    }

    /**
     * Получение и отрисовка товаров в корзине
     */
    getCartProducts() {
        console.log('get cart');
        if (!this.isAuth) {
            const isCartExist = JSON.parse(localStorage.getItem('cart_status'));
            if (!isCartExist) {
                return {};
            }
            const currentCart = JSON.parse(localStorage.getItem('products_map'), this.reviver);
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
                console.log(result);
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    eventEmmiter.emit(Events.CART_PRODUCTS, body);
                    const productsMap = new Map();
                    body.products.forEach((product) => {
                        productsMap.set(product.id, product);
                    });
                    localStorage.setItem('products_map', JSON.stringify(productsMap, this.replacer));
                    // заменить на апдейт + класть в сторейдж
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

    /**
   * Получение и отрисовка карусели товаров
   * @param {Number} offset Сдвиг в списке товаров
   * @param {Number} count Количество запрашиваемых товаров
   * @param {Object} config Конфиг карусели
   */
    getProducts(offset, count, config) {
        // console.log('get');
        Ajax.prototype
            .getRequest(`${getProducts}?paging=${offset}&count=${count}`)
            .then((result) => {
                // console.log(result);
                const [statusCode, body] = result;
                switch (statusCode) {
                case 200:
                    const products = this.isProductInCart(body);
                    eventEmmiter.emit(Events.PRODUCTS, products, config);
                    break;
                case 429:
                    renderServerError(body.error || 'Ошибка');
                    break;
                default:
                    break;
                }
            });
    }

    isProductInCart(products) {
        const isCartExist = JSON.parse(localStorage.getItem('cart_status'));
        if (!isCartExist) {
            return products;
        }
        const productsMap = JSON.parse(localStorage.getItem('products_map'), this.reviver);
        products.forEach((product) => {
            if (!productsMap) {
                product.quantity = 0;
            } else {
                const data = productsMap.get(product.id);
                if (data) {
                    product.quantity = data.quantity;
                } else {
                    product.quantity = 0;
                }
            }
        });
        return products;
    }

    getCartCount() {
        const [count] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, count);
    }

    addProductLocal(data) {
        console.log('add product, store', data);
        localStorage.setItem('cart_status', true);
        const productsMap = JSON.parse(localStorage.getItem('products_map'), this.reviver);
        data.quantity += 1;
        if (this.isAuth) {
            Ajax.prototype
                .postRequest(addProductUrl, {id: data.id, quantity: data.quantity})
                .then((result) => {
                    const [statusCode, body] = result;
                    switch (statusCode) {
                    case 200:
                        // const products = this.isProductInCart(body);
                        // eventEmmiter.emit(Events.PRODUCTS, products, config);
                        break;
                    case 429:
                        renderServerError(body.error || 'Ошибка');
                        return;
                    default:
                        return;
                    }
                });
        }
        if (!productsMap) {
            const productsMap = new Map();
            productsMap.set(data.id, data);
            console.log(productsMap.get(data.id));
            localStorage.setItem('products_map', JSON.stringify(productsMap, this.replacer));
            eventEmmiter.emit(Events.ADD_PRODUCT_SUCCESS, data);
            eventEmmiter.emit(Events.UPDATE_CART_ICON, 1);
            eventEmmiter.emit(Events.UPDATE_CART_RESULT, 1, data.price);
            return;
        }

        productsMap.set(data.id, data);
        console.log(productsMap.get(data.id));
        localStorage.setItem('products_map', JSON.stringify(productsMap, this.replacer));
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.ADD_PRODUCT_SUCCESS, data);
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
    }

    changeProductCountLocal(data, isDecrease) {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), this.reviver);
        const product = productsMap.get(data.id);
        if (!product) {
            return;
        }
        product.quantity += isDecrease ? -1 : 1;
        if (!product.quantity) {
            if (this.isAuth) {
                Ajax.prototype
                    .postRequest(delProductUrl, {id: data.id})
                    .then((result) => {
                        const [statusCode, body] = result;
                        switch (statusCode) {
                        case 200:
                            // const products = this.isProductInCart(body);
                            // eventEmmiter.emit(Events.PRODUCTS, products, config);
                            break;
                        case 429:
                            renderServerError(body.error || 'Ошибка');
                            return;
                        default:
                            return;
                        }
                    });
            }
            productsMap.delete(data.id);
            localStorage.setItem('products_map', JSON.stringify(productsMap, this.replacer));
            eventEmmiter.emit(Events.DEL_PRODUCT_SUCCESS, product);
            const [productCount, productsPrice] = this.getProductsInfo();
            eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
            eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
            return;
        }
        if (this.isAuth) {
            Ajax.prototype
                .postRequest(addProductUrl, {id: data.id, quantity: product.quantity})
                .then((result) => {
                    const [statusCode, body] = result;
                    switch (statusCode) {
                    case 200:
                        // const products = this.isProductInCart(body);
                        // eventEmmiter.emit(Events.PRODUCTS, products, config);
                        break;
                    case 429:
                        renderServerError(body.error || 'Ошибка');
                        return;
                    default:
                        return;
                    }
                });
        }


        productsMap.set(data.id, product);
        localStorage.setItem('products_map', JSON.stringify(productsMap, this.replacer));
        eventEmmiter.emit(Events.CHG_PRODUCT_SUCCESS, product);
        const [productCount, productsPrice] = this.getProductsInfo();
        eventEmmiter.emit(Events.UPDATE_CART_ICON, productCount);
        eventEmmiter.emit(Events.UPDATE_CART_RESULT, productCount, productsPrice);
    }

    getProductsInfo() {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), this.reviver);
        let price = 0;
        let count = 0;
        if (!productsMap) {
            return [count, price];
        }
        // count = productsMap.size;
        productsMap.forEach((product) => {
            price += product.price * product.quantity;
            count += product.quantity;
        });
        return [count, price];
    }

    replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
        } else {
            return value;
        }
    }

    reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }
}

export const userStore = new UserStore();
