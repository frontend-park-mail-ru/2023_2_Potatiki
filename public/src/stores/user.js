import {AppDispatcher} from '../modules/dispatcher';
import {UserActionsType} from '../actions/user';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {checkLogin, checkPassword} from '../modules/validation';
import {loginUrl, signupUrl, checkUrl, logoutUrl, mainRoute, getProductsUrl, loginRoute, signupRoute, getCurrentAddressUrl} from '../config/urls';
import {Events} from '../config/events';
import {reviver} from '../modules/utils';
import renderServerMessage from '../modules/server-message';
import router from '../modules/router';

/**
 * Класс
 */
class UserStore {
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
                    action.payload.phone,
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
            case UserActionsType.REMOVE_LISTENERS:
                this.removeListeners();
                break;
            case UserActionsType.VALIDATE_PHONE:
                this.validatePhone(action.payload.phone);
                break;
            case UserActionsType.CHECK_AUTH:
                this.checkAuth();
                break;
            case UserActionsType.GET_PROFILE_DATA:
                this.getProfileData();
                break;
            case UserActionsType.GET_CSRF_TOKEN:
                this.getCsrfToken(action.payload.page);
                break;
            case UserActionsType.GET_CURRENT_ADDRESS:
                this.getCurrentAddress();
                break;
            default:
                break;
            }
        });
    }

    subscribeToEvents() {
        eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, this.userNotAuth);
    }

    removeListeners() {
        eventEmmiter.emit(Events.REMOVE_SUBSCRIBES);
        eventEmmiter.emit(Events.REMOVE_LISTENERS);
    }

    userNotAuth() {
        console.log('store user not auth');
        this.#state.isAuth = false;
    }

    userNotAuth = this.userNotAuth.bind(this);

    checkAuth() {
        console.log('checkAuth', this.isAuth);
        if (!this.isAuth) {
            console.log('page forbidden');
            eventEmmiter.emit(Events.PAGE_FORBIDDEN);
            return;
        }
        console.log('page allowed');
        eventEmmiter.emit(Events.PAGE_ALLOWED);
    }

    /**
     *
     */
    async checkSession() {
        const [statusCode] = await Ajax.prototype.getRequest(checkUrl);
        console.log('check auth', statusCode);
        switch (statusCode) {
        case 200:
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.USER_IS_AUTH, {url: location.pathname});
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: location.pathname});
            router.go({url: location.pathname});

            break;
        case 429:
            renderServerMessage('Ошибка. Попробуйте позже');
            // eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            router.go({url: location.pathname});
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
        },
        this.#state.csrfToken,
        );
        switch (statusCode) {
        case 200:
            this.#state.login = login;
            this.#state.password = password;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_LOGIN);
            break;
        case 403:
            renderServerMessage('Ошибка доступа');
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
    async signup(login, password, repeatPassword, phone) {
        const isValidLogin = this.validateLogin(login);
        const isValidPassword = this.validatePassword(password);
        const isValidRepeatPassword = this.validateRepeatPassword(
            password,
            repeatPassword,
        );

        console.log(password, repeatPassword);

        if (!(isValidLogin && isValidPassword && isValidRepeatPassword)) {
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(signupUrl, {
            login,
            password,
            phone,
        },
        this.#state.csrfToken,
        );
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
        eventEmmiter.emit(Events.LOGOUT, {url: location.pathname});
    }


    validatePhone() {

    }

    async getProfileData() {
        const [statusCode, body] = await Ajax.prototype.getRequest(checkUrl);
        switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.PROFILE_DATA, body);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    }

    async recordCSRFToken(url) {
        const [statusCode, token] = await Ajax.prototype.getCSRFRequest(url);
        switch (statusCode) {
        case 200:
            console.log(token);
            this.#state.csrfToken = token;
            break;
        default:
            break;
        }
    }

    async getCsrfToken(page) {
        switch (page) {
        case loginRoute:
            this.recordCSRFToken(loginUrl);
        case signupRoute:
            console.log('signup');
            this.recordCSRFToken(signupUrl);
        default:
            break;
        }
    }

    async getCurrentAddress() {
        const [statusCode, body] = await Ajax.prototype.getRequest(getCurrentAddressUrl);
        switch (statusCode) {
        case 200:
            console.log('get current address');
            eventEmmiter.emit(Events.CURRENT_ADDRESS, body);
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
            break;
        case 404:
            eventEmmiter.emit(Events.ADDRESS_NOT_FOUND, body);
            break;
        case 429:
            renderServerMessage('Возникла ошибка при получении адреса');
            break;
        default:
            break;
        }
    }
}

export const userStore = new UserStore();
