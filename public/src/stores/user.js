import {AppDispatcher} from '../modules/dispatcher';
import {UserActionsType} from '../actions/user';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {checkLogin, checkPassword} from '../modules/validation';
import {loginUrl, signupUrl, checkUrl, logoutUrl, mainRoute, getProducts} from '../config/urls';
import {Events} from '../config/events';
import {reviver} from '../modules/utils';
import renderServerError from '../modules/server-error';

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
            case UserActionsType.GET_PRODUCTS:
                this.getProducts(
                    action.payload.offset,
                    action.payload.count,
                    action.payload.config,
                );
                break;
            case UserActionsType.REMOVE_LISTENERS:
                this.removeListeners();
                break;
            default:
                break;
            }
        });
    }

    removeListeners() {
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
            break;
        case 400:
            eventEmmiter.emit(Events.LOGIN_FORM_ERROR, 'Неверный логин или пароль');
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
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
            // this.updateCart();
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
    }

    /**
   * Получение и отрисовка карусели товаров
   * @param {Number} offset Сдвиг в списке товаров
   * @param {Number} count Количество запрашиваемых товаров
   * @param {Object} config Конфиг карусели
   */
    getProducts(offset, count, config) {
        Ajax.prototype
            .getRequest(`${getProducts}?paging=${offset}&count=${count}`)
            .then((result) => {
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
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
        if (!productsMap) {
            return products;
        }
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

    getProductsInfo() {
        const productsMap = JSON.parse(localStorage.getItem('products_map'), reviver);
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
}

export const userStore = new UserStore();
